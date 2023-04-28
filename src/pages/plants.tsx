import { Plant } from "@/models/plant";
import { Watering } from "@/models/watering";
import { getWaterings } from "@/services/watering_service";
import { GetStaticPropsContext } from "next/types";
import { useEffect, useState } from "react";

export interface PlantsProps {
  plants: Plant[];
  userCode: string;
}

export default function Plants(props: PlantsProps) {
  const [waterings, setWaterings] = useState<{ [plantID: number]: Watering[] }>(
    {}
  );

  const handleWaterPlantClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    plantId: number
  ) => {
    const response = await fetch(
      `/api/users/${props.userCode}/waterPlant/${plantId}`
    );
  };

  useEffect(() => {
    const fetchWaterings = async () => {
      const fetchedWaterings: { [plantID: number]: Watering[] } =
        props.plants.reduce(
          async (map, plant) => ({
            ...map,
            [plant.id]: await getWaterings(plant.id),
          }),
          {}
        );
      setWaterings(fetchedWaterings);
    };

    return () => {
      fetchWaterings().catch((e) => console.error(e));
    };
  }, props.plants);

  return (
    <div>
      {props.plants.map((plant, index) => {
        return (
          <div>
            <p key={index}>Plant of type {plant.type}</p>
            {waterings[plant.id] && waterings[plant.id].map((watering, index) => {
              return <p key={index}>Watering at time {watering.time}</p>;
            })}
            <button onClick={(e) => handleWaterPlantClick(e, plant.id)}>
              Water Me
            </button>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
