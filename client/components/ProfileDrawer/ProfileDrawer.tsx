import { useSession } from '../../hooks/useSession';
import { Button, Avatar, TextInput } from '@mantine/core';
import { IconAt, IconUser, IconCalendar } from '@tabler/icons-react';
import './ProfileDrawerStyles.css';

export default function ProfileDrawer({ handleOnClose }) {
  const { data } = useSession();

  return (
    <div className="profile-drawer-wrapper">
      <div className="profile-hero-wrapper">
        <Avatar radius={150} size={150}>
          {data?.user?.name?.[0]?.toUpperCase()}
        </Avatar>
        <TextInput
          defaultValue={data?.user?.name ?? ''}
          label="Username"
          icon={<IconUser size={14} />}
        />
      </div>
      <div className="profile-info-wrapper">
        <div className="profile-info-column">
          <TextInput
            defaultValue={data?.user?.name ?? ''}
            label="First name"
            icon={<IconUser size={14} />}
          />
          <TextInput
            label="Last name"
            placeholder="Your last name"
            icon={<IconUser size={14} />}
          />
        </div>
        <div className="profile-info-column">
          <TextInput
            label="Email"
            placeholder="Your email"
            icon={<IconAt size={14} />}
          />
          <TextInput
            disabled
            label="Created at"
            placeholder="Date"
            icon={<IconCalendar size={14} />}
          />
        </div>

        <div className="change-password">
          Do you want to change your password?
        </div>
        <div className="action-buttons-wrapper">
          <Button className="edit-button">Edit</Button>
          <Button
            className="close-button"
            onClick={handleOnClose}
            variant="default"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
