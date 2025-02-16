import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { EventsContext } from "../context/eventsContext";
import Day from "../components/day/day";
import Event from "../components/event/event";
import dateReducer from "../reducers";

export default {
    title: "Components",
};

const store = configureStore({ reducer: { date: dateReducer } });
const eventsMock = {
    "10-10-2023": [{ id: 1, name: "Meeting", event: "Discuss project" }],
};

export const DayComponent = () => (
    <Provider store={store}>
        <EventsContext.Provider value={{ events: eventsMock }}>
            <Day info={{ value: 10, date: new Date(2023, 9, 10) }} disable={false} />
        </EventsContext.Provider>
    </Provider>
);

export const EventComponent = () => (
    <Event
        data={{ id: 1, name: "Meeting", event: "Discuss project", isEdit: false }}
        setDisableButton={() => {}}
        handleDeleteEvent={() => {}}
    />
);
