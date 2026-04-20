"use client";

import Link from "next/link";
import { getTranslation } from "../utils/i18n";

type NavComponentProps = {
  locale: string;
};

export default function NavComponent({ locale }: NavComponentProps) {
  const t = getTranslation(locale);
  const categoryPath = t.category || "categorie";

  const menu = t.menu;
  const slugs = t.slugs;

  return (
    <nav className="navigation navigation-main nav-hov-a ">
      <ul id="menu-main-menu" className="menu font-interExtraBold">
        <li className="menu-item">
          <Link href={`/${locale}`} aria-current="page">{menu.home}</Link>
        </li>        

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.generalnews}`} className="">{menu.generalnews}</Link>          
        </li>

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.businessnews}`}>{menu.businessnews}</Link>          
        </li>

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.financialmarket}`}>{menu.financialmarket}</Link>
          <ul className="sub-menu">
            <li><Link href={`/${locale}/${categoryPath}/${slugs.ngx}`} className="font-interMedium">{menu.ngx}</Link></li>
          </ul>
        </li>

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.businessector}`}>{menu.businessector}</Link>
          <ul className="sub-menu">
            <li><Link href={`/${locale}/${categoryPath}/${slugs.finance}`} className="font-interMedium">{menu.finance}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.tech}`} className="font-interMedium">{menu.tech}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.oilandgas}`} className="font-interMedium">{menu.oilandgas}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.agriculture}`} className="font-interMedium">{menu.agriculture}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.media}`} className="font-interMedium">{menu.media}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.energy}`} className="font-interMedium">{menu.energy}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.transportation}`} className="font-interMedium">{menu.transportation}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.services}`} className="font-interMedium">{menu.services}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.distribution}`} className="font-interMedium">{menu.distribution}</Link></li>            
          </ul>
        </li>

        {/*
        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.tribune}`}>{menu.tribune}</Link>
          <ul className="sub-menu">
            <li><Link href={`/${locale}/${categoryPath}/${slugs.interview}`} className="font-interMedium">{menu.interview}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.opinions}`} className="font-interMedium">{menu.opinions}</Link></li>
          </ul>
        </li>
        */}

        <li className="menu-item">
          <Link href={`/${locale}/${categoryPath}/${slugs.successtories}`}>{menu.successtories}</Link>
        </li>

        <li className="menu-item">
          <Link href={`/${locale}/${categoryPath}/${slugs.trends}`}>{menu.trends}</Link>
        </li>
        <li className="menu-item">
          <Link href={`/${locale}/${categoryPath}/${slugs.opinions}`}>{menu.opinions}</Link>
        </li>
      </ul>
    </nav>
  );
}
