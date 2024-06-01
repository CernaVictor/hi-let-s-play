'use client';

import {
  Button,
  Modal,
  Avatar,
  Menu,
  Drawer,
  useMantineTheme,
} from '@mantine/core';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from '../../hooks/useSession';
import SignIn from '../SignIn/SignIn';
import Image from 'next/image';
import Logo from '../../assets/logo.png';
import Profile from '../ProfileDrawer/ProfileDrawer';
import { IconUserCircle, IconLogout } from '@tabler/icons-react';
import './NavbarStyles.css';

export default function Navbar() {
  const { data, status } = useSession();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const theme = useMantineTheme();

  const toggleModdal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const toggleDrawer = () => {
    setIsDrawerVisible((prev) => !prev);
  };

  return (
    <div className="navbar-wrapper">
      <div>
        <Link className="link-decoration" href={'/'}>
          <Image className="logo-img" src={Logo} alt="logo" />
        </Link>
        {/* {status === 'authenticated' && (
          <span className="welcome-message">{`Welcome, ${data?.user?.name}!`}</span>
        )} */}
      </div>
      <div className="avatar">
        <Link className="link-decoration" href={'/'}>
          <Button className="anchor-btn-home" variant="outline" uppercase>
            Home
          </Button>
        </Link>
        {status === 'authenticated' ? (
          !!data?.user?.isSportsCenterOwner ? (
            <Link className="link-decoration" href={'/sportsCenter'}>
              <Button
                className="anchor-btn-centers"
                variant="outline"
                uppercase
              >
                Centers
              </Button>
            </Link>
          ) : (
            <Link className="link-decoration" href={'/calendar'}>
              <Button
                className="anchor-btn-centers"
                variant="outline"
                uppercase
              >
                Calendar
              </Button>
            </Link>
          )
        ) : (
          <></>
        )}
        <Link className="link-decoration" href={'/search'}>
          <Button className="anchor-btn-contact" variant="outline" uppercase>
            Search
          </Button>
        </Link>
        {status === 'authenticated' ? (
          <Menu trigger="hover">
            <Menu.Target>
              <Avatar radius="xl">{data?.user?.name?.[0].toUpperCase()}</Avatar>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={toggleDrawer}
                icon={<IconUserCircle size={14} />}
              >
                Profile
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={() => {
                  signOut();
                }}
                icon={<IconLogout size={14} />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button
            variant="subtle"
            className="login-btn"
            title="Login"
            onClick={() => {
              toggleModdal();
            }}
            uppercase
          >
            Log in / Sign up
          </Button>
        )}
        <Modal
          opened={isModalVisible}
          size="sm"
          onClose={toggleModdal}
          title="Authentication"
          overlayProps={{
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
            opacity: 0.55,
            blur: 3,
          }}
        >
          <SignIn onAuthComplete={toggleModdal} />
        </Modal>
        <Drawer
          opened={isDrawerVisible}
          onClose={() => toggleDrawer()}
          title="Profile"
          position="right"
          padding="xl"
          size="xl"
        >
          <Profile handleOnClose={toggleDrawer} />
        </Drawer>
      </div>
    </div>
  );
}
