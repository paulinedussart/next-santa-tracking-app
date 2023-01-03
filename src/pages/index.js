import Head from 'next/head';
import useSWR from 'swr'

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss';
import { getTimeFromObjectToString } from './hook/time'

const DEFAULT_CENTER = [38.907132, -77.036546]

const fetcher = (...args) => fetch(...args).then(res => res.json())
const API = "https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b"

export default function Home() {
  const { data, error, isLoading } = useSWR(API, fetcher)
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
            Next.js Leaflet Starter
          </h1>

          <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={3}>
            {({ TileLayer, Marker, Popup }, L) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {data?.destinations.map(
                  ({ arrival, city, departure, id, location, region }) => (
                    <Marker
                      key={id}
                      position={[location.lat, location.lng]}
                      icon={L.icon({
                        iconUrl: "leaflet/images/tree-marker-icon.png"
                      })}
                    >
                      <Popup>
                        <b> 🏛 City : </b> {city}<br />
                        <b> 🗺 Region : </b> {region}<br />
                        <b> 🛬 Arrival : </b>{getTimeFromObjectToString(arrival)} <br />
                        <b> 🛫 Departure : </b>{getTimeFromObjectToString(departure)}
                      </Popup>
                    </Marker>
                  )
                )}
              </>
            )}
          </Map>

          <p className={styles.description}>
            <code className={styles.code}>yarn create next-app -e https://github.com/colbyfayock/next-leaflet-starter</code>
          </p>

          <p className={styles.view}>
            <Button href="https://github.com/colbyfayock/next-leaflet-starter">Vew on GitHub</Button>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}
