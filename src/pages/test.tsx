import { useEffect, useState } from 'react';
import protobuf from 'protobufjs';
const { Buffer } = require('buffer/');

const emojis = {
  '': '',
  'up': '🚀',
  'down': '💩',
}

function formatPrice(price: any) {
  return `$${price.toFixed(2)}`;
}

function App() {
  const [stonks, setStonks] = useState<any[]>([]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ws = new WebSocket('wss://streamer.finance.yahoo.com');
    protobuf.load('./YPricingData.proto', (error, root) => {
      if (error) {
        return console.log(error);
      }
      //@ts-ignore
      const Yaticker = root.lookupType('yaticker');

      ws.onopen = function open() {
        console.log('connected');
        ws.send(
          JSON.stringify({
            subscribe: (params.get('symbols') || 'GME')
              .split(',')
              .map((symbol) => symbol.toUpperCase()),
          })
        );
      };

      ws.onclose = function close() {
        console.log('disconnected');
      };

      ws.onmessage = function incoming(message) {
        const next = Yaticker.decode(new Buffer(message.data, 'base64'));
        setStonks((current: any) => {
            //@ts-ignore
          let stonk = current.find((stonk: any) => stonk.id === next.id);
          if (stonk) {
            return current.map((stonk: any) => {
                //@ts-ignore
              if (stonk.id === next.id) {
                return {
                  ...next,
                  direction:
                  //@ts-ignore
                    stonk.price < next.price
                      ? 'up'
                      //@ts-ignore
                      : stonk.price > next.price
                      ? 'down'
                      : stonk.direction,
                };
              }
              return stonk;
            });
          } else {
            return [
              ...current,
              {
                ...next,
                direction: '',
              },
            ];
          }
        });
      };
    });
  }, []);

  return (
    <div className="stonks">
      {stonks.map((stonk) => (
          //@ts-ignore
        <div className="stonk" key={stonk.id}>
            //@ts-ignore
          <h2 className={stonk.direction}>
          //@ts-ignore
            {stonk.id} {formatPrice(stonk.price)}
          </h2>
        </div>
      ))}
    </div>
  );
}