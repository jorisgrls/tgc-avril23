'use client';

import AvatarDropdown from '@/components/AvatarDropdown';
import { useProfileQuery } from '@/graphql/generated/schema';
import { setUser } from '@/store/user.store';
import {
  BadgeDollarSignIcon,
  Book,
  BookOpenIcon,
  HomeIcon,
  TruckIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LayoutNavbar = ({ children }: any) => {
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: 'all',
    onCompleted: (data) => {
      setUser(data.profile);
    },
  });
  const pathname = usePathname();
  const MENUS = [
    {
      id: 1,
      title: 'Accueil',
      icon: <HomeIcon className="h-6 w-6 text-gray-700" />,
      href: '/',
    },
    {
      id: 2,
      title: 'Mon frigo',
      icon: <TruckIcon className="h-6 w-6 text-gray-700" />,
      href: '/mon-frigo',
    },
    {
      id: 3,
      title: 'Mes recettes',
      icon: <BookOpenIcon className="h-6 w-6 text-gray-700" />,
      href: '/mes-recettes',
    },
    {
      id: 4,
      title: 'Recettes à valider',
      icon: <BookOpenIcon className="h-6 w-6 text-gray-700" />,
      href: '/recettes-a-valider',
    },
  ];
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <BadgeDollarSignIcon className="h-6 w-6" />
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  What&apos;s for dinner ?
                </span>
              </a>
            </div>
            <AvatarDropdown />
          </div>
        </div>
      </nav>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {MENUS.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.href}
                  className={`${
                    pathname == menu.href && 'bg-gray-100'
                  } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  {menu.icon}
                  <span className="ms-3">{menu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="pt-24 p-6 sm:ml-64">{children}</div>
    </>
  );
};

export default LayoutNavbar;
