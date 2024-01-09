"use client";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./About.module.css";

function About() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div className={classes.about}>
        <Button onClick={open} color="orange">
          About
        </Button>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="auto"
      >
        <h2> The why</h2>

        <h3>
          Everyone knows that working with timezones is frustrating. From
          scheduling meetings, to figuring out when your flight lands, to
          programming, the arbitrary lines chosen by governments cause headaches
          for everyone.
          <br />
          <br />
          I mean does it realy make sense that Nepal is a half hour ahead of
          India, despite being at the same-ish longitude? Or that the Spanish
          government decided that they will be in GMT+1, despite most of the
          country lying west of Greenwich?
          <br />
          <br />
          It is hard to think of a timezone decision made by a government that
          makes sense, and so, I propose a new paradigm for timezones, ones
          calculated entirely based on your longitudinal position.
        </h3>

        <h2> The how </h2>
        <h3>
          Built using Next.js and the inbuilt navigator.geolocation API, buttons
          from Mantine, favicon from icons8, hosted on Vercel
        </h3>
        <h2> The who </h2>
        <h3>
          I am Simonas Stonkus, an Astrophysicist turned software developer,
          currently tackling web development through dumb projects like this
          one.
        </h3>
      </Modal>
    </>
  );
}

export default About;
