import { Card, Group, Text, Flex, Button } from '@mantine/core';
import { useStyles } from './BenefitsStyles';
import { IconClock, IconCheck, IconHistory } from '@tabler/icons-react';

export const Benefits = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.classes.wrapper}>
      <Group>
        <Card
          className={classes.classes.card}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Card.Section>
            <Flex
              mih={75}
              bg="#2C2C2C"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <IconHistory className={classes.classes.icon} color="#DFF7FF" />
            </Flex>
          </Card.Section>

          <Group position="center" mt="md" mb="xs">
            <Text weight={500}>History</Text>
          </Group>

          <Text size="sm" color="dimmed">
            All the reservations done through HLP remain archived and access to
            them is provided at any time.<br></br> <br></br>Furthermore, you can
            cancel your reservation with a simple click, without having to
            contact the owner of the sport center.
          </Text>
        </Card>
        <Card
          className={classes.classes.card}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Card.Section>
            <Flex
              mih={75}
              bg="#2C2C2C"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <IconCheck className={classes.classes.icon} color="#DFF7FF" />
            </Flex>
          </Card.Section>

          <Group position="center" mt="md" mb="xs">
            <Text weight={500}>Availability</Text>
          </Group>

          <Text size="sm" color="dimmed">
            The availability of sport fields is always a problem. You have to
            call many places before finding an available field.<br></br>{' '}
            <br></br>On Hi! Let's play! you won't have to worry. Here you can
            find fields for all types of activities that are of interest and are
            available in your desired time interval
          </Text>

          <Button
            className={classes.classes.btn}
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={props.scrollToSearchForm}
          >
            Look for sport fields!
          </Button>
        </Card>
        <Card
          className={classes.classes.card}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Card.Section>
            <Flex
              mih={75}
              bg="#2C2C2C"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <IconClock className={classes.classes.icon} color="#DFF7FF" />
            </Flex>
          </Card.Section>

          <Group position="center" mt="md" mb="xs">
            <Text weight={500}>Reservations 24/7</Text>
          </Group>

          <Text size="sm" color="dimmed">
            With HLP you have the possibility of making reservations at any
            hour, 24/7. The website is available non-stop and we guarantee this
            thing. <br></br> <br></br>The sport centre administrators can also
            check in to their statistics metrics at any time, which helps in
            analysing their performances
          </Text>
        </Card>
      </Group>
    </div>
  );
};
