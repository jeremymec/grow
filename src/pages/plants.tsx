import { Plant } from "@/models/plant";
import { GetStaticPropsContext } from "next/types";

export interface PlantsProps {
    plants: Plant[]
}

export default function Plants(props: PlantsProps) {

  return (
    <div>
        {props.plants.map(plant => {
            return (<p>Plant of type {plant.type}</p>)
        })}
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }