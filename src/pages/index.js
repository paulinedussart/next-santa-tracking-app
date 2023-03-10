import Head from 'next/head';
import useSWR from 'swr'

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss';
import { getTimeFromObjectToString } from './hook/time'
import { markerLogic } from "./hook/markerLogic"

const DEFAULT_CENTER = [43.2569629, -2.9234409]

const fetcher = (...args) => fetch(...args).then(res => res.json())
const API = "https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b"

export default function Home() {
  const { data, error, isLoading } = useSWR(API, fetcher)
  const currentDate = new Date("25 decembre 2023 02:30:56")
  const currentYear = currentDate.getFullYear()

  // update 2019 old date GOOGLE API to 2023
  const destinations = data?.destinations.map((destination) => {
    const { arrival, departure } = destination

    const arrivalDate = new Date(arrival)
    const departureDate = new Date(departure)

    arrivalDate.setFullYear(currentYear)
    departureDate.setFullYear(currentYear)

    return {
      ...destination,
      arrival: arrivalDate.getTime(),
      departure: departureDate.getTime()
    }

  })

  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>
            Santa Tracker
          </h1>

          <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={4}>
            {({ TileLayer, Marker, Popup }, L) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {destinations?.map(
                  ({ arrival, city, departure, id, location, region }) => {

                    return (
                      < Marker
                        key={id}
                        position={[location.lat, location.lng]}
                        icon={
                          L.icon({
                            iconUrl: markerLogic(arrival, departure, currentDate)
                          })
                        }
                      >
                        <Popup>
                          <b> ???? City : </b> {city}<br />
                          <b> ???? Region : </b> {region}<br />
                          <b> ???? Arrival : </b>{getTimeFromObjectToString(arrival)} <br />
                          <b> ???? Departure : </b>{getTimeFromObjectToString(departure)}
                        </Popup>
                      </Marker>)
                  }
                )}
              </>
            )}
          </Map>
        </Container>
      </Section>
    </Layout >
  )
}
