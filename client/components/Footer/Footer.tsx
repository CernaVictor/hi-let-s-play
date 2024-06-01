'use client';
import { useStyles } from './FooterStyles';
import './FooterStyles';
import { Text, Title, Divider } from '@mantine/core';
import {
  IconPhone,
  IconMail,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBallFootball,
  IconBallBasketball,
  IconBallTennis,
} from '@tabler/icons-react';
export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.classes.wrapper}>
      <div>
        <div>
          <Title order={3} color="white">
            SPORTS
          </Title>
          <Divider
            className={classes.classes.divider}
            color="#EA855F"
            size="xs"
          />
        </div>
        <div className={classes.classes.contentWrapper}>
          <div className={classes.classes.footerContentRow}>
            <IconBallFootball color="white" />
            <Text
              className={classes.classes.footerContentRowItem}
              color="white"
            >
              Soccer
            </Text>
          </div>
          <div className={classes.classes.footerContentRow}>
            <IconBallBasketball color="white" />
            <Text
              className={classes.classes.footerContentRowItem}
              color="white"
            >
              Basketball
            </Text>
          </div>
          <div className={classes.classes.footerContentRow}>
            <IconBallTennis color="white" />
            <Text
              className={classes.classes.footerContentRowItem}
              color="white"
            >
              Tennis
            </Text>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Title order={3} color="white">
            CONTACT
          </Title>
          <Divider
            className={classes.classes.divider}
            color="#EA855F"
            size="xs"
          />
        </div>
        <div className={classes.classes.contentWrapper}>
          <div className={classes.classes.footerContentRow}>
            <IconPhone color="white" />
            <Text
              className={classes.classes.footerContentRowItem}
              color="white"
            >
              contact@hlp.com
            </Text>
          </div>
          <div className={classes.classes.footerContentRow}>
            <IconMail color="white" />
            <Text
              className={classes.classes.footerContentRowItem}
              color="white"
            >
              0737252666
            </Text>
          </div>
        </div>
      </div>

      <div>
        <div>
          <Title order={3} color="white">
            SOCIAL MEDIA
          </Title>
          <Divider
            className={classes.classes.divider}
            color="#EA855F"
            size="xs"
          />
        </div>
        <div className={classes.classes.contentWrapper}>
          <div className={classes.classes.footerContentRow}>
            <IconBrandFacebook color="white" />
            <IconBrandInstagram
              className={classes.classes.footerContentRowIconItem}
              color="white"
            />
            <IconBrandTwitter
              className={classes.classes.footerContentRowIconItem}
              color="white"
            />
            <IconBrandLinkedin
              className={classes.classes.footerContentRowIconItem}
              color="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
