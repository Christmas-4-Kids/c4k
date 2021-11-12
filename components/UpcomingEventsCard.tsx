import React from "react"
import { Card } from "./Card"
import { useStyles } from "../context/styles.context"
import { View, Text } from "react-native"
import UpcomingEvent from "./UpcomingEvent"

const hardCodedEvents = [
  {
    month: "NOV",
    day: "22",
    title: "2021 C4K Benefit Concert",
    description: `Monday, November 22nd, 2021${"\n"}7pm • Ryman Auditorium`,
    buttonText: "Get Tickets",
    buttonUrl: "https://christmas4kids.org/christmas-4-kids-concert/",
  },
  {
    month: "DEC",
    day: "13",
    title: "2021 C4K Bus Show",
    description: `Monday, December 13th, 2021${"\n"}5pm • Hendersonville Walmart`,
    buttonText: "Learn More",
    buttonUrl: "https://christmas4kids.org/busshow/",
  },
  {
    month: "DEC",
    day: "14",
    title: "2021 C4K Shopping Day",
    description: `Tuesday, December 14th, 2021${"\n"}6pm • Hendersonville Walmart`,
    buttonText: "Learn More",
    buttonUrl: "https://christmas4kids.org/chaperone-registrations/",
  },
]

const UpcomingEventsCard = () => {
  const { styles } = useStyles()

  return (
    <Card>
      <Text style={styles.upcomingEventsCardTitle}>Upcoming Events</Text>
      {hardCodedEvents.map((event, index) => (
        <React.Fragment key={index}>
          <UpcomingEvent month={event.month} day={event.day} title={event.title} description={event.description} buttonText={event.buttonText} buttonUrl={event.buttonUrl} />
          {index === hardCodedEvents.length - 1 ? null : <View style={styles.upcomingEventsCardDivider}></View>}
        </React.Fragment>
      ))}
    </Card>
  )
}

export default UpcomingEventsCard
