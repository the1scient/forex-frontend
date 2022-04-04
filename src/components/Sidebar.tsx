import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Sidebar() {

    const { t, i18n } = useTranslation('common');

    return(
        <div className="sidebar-container">
    <div className="sidebar-logo">
        Forex Dashboard
    </div>
    <ul className="sidebar-navigation">
        <li className="header">{t('navigation.menu.title')}</li>
        <li>
            <Link to='/'>
                <i className="fa fa-home" aria-hidden="true" />{t('navigation.home')}
            </Link>
         </li>
        <li>
          <Link to='/trades'>
                <i className="fa fa-history" aria-hidden="true"/> {t('navigation.trades')}
          </Link>
        </li>
        {/**<li className="header">Another Menu Header</li> */}
        <li>
            <Link to=''>
                <i className="fa fa-keyboard" aria-hidden="true" />
                <button className="btn btn-dark" onClick={() => i18n.changeLanguage('en')}>en</button>
                <button className="btn btn-dark" onClick={() => i18n.changeLanguage('pt')}>pt</button>
            </Link>
        
        </li>
    </ul>
</div>
    );

}