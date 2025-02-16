import React, { useState } from "react";
import Event from "./event";

export default {
    title: "Components/Event",
    component: Event,
    argTypes: {
        data: { control: "object" },
    },
};

const Template = (args) => {
    const [disableButton, setDisableButton] = useState(false);

    return (
        <Event
            {...args}
            setDisableButton={setDisableButton}
            handleDeleteEvent={(id, date) => console.log(`Deleted event ${id} on ${date}`)}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    data: {
        id: 1,
        name: "Meeting",
        event: "Team sync-up at 10 AM",
        date: "2024-01-01",
        isEdit: false,
    },
};

export const Editing = Template.bind({});
Editing.args = {
    data: {
        id: 2,
        name: "Workshop",
        event: "React workshop at 3 PM",
        date: "2024-01-02",
        isEdit: true,
    },
};

export const LongEvent = Template.bind({});
LongEvent.args = {
    data: {
        id: 3,
        name: "Conference",
        event: "Annual tech conference with multiple speakers and sessions.",
        date: "2024-01-03",
        isEdit: false,
    },
};
