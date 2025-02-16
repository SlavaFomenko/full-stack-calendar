import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Day from "./day";
import { EventsContext } from "../../context/eventsContext";
import { setDate } from "../../actions";

export default {
    title: "Components/Day",
    component: Day,
    argTypes: {
        info: { control: "object" },
        disable: { control: "boolean" },
    },
};

const store = configureStore({
    reducer: {
        date: (state = { day: null }, action) => {
            if (action.type === setDate.type) {
                return { day: action.payload };
            }
            return state;
        },
    },
});

const Template = (args) => (
    <Provider store={store}>
        <EventsContext.Provider value={{ events: { "1-1-2024": ["Meeting"] } }}>
            <Day {...args} />
        </EventsContext.Provider>
    </Provider>
);

export const Default = Template.bind({});
Default.args = {
    info: { value: 5, date: new Date(2024, 0, 5) },
    disable: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
    info: { value: 2, date: new Date(2024, 0, 2) },
    disable: true,
};

export const WithEvents = Template.bind({});
WithEvents.args = {
    info: { value: 3, date: new Date(2024, 0, 1) },
    disable: false,
};
