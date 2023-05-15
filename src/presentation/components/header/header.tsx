import React, { memo } from 'react'
import Styles from './header-styles.scss'
import { Logo } from '@/presentation/components'

const Header: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>Jean</span>
            <a href='#'>Sair</a>
          </div>
        </div>
      </header>
    </div>
  )
}

export default memo(Header)
