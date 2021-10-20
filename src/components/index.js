import MapBoxComp from "@/components/mapBoxComp/index";
import WorldComp from "@/components/worldComp/index";
import WorldPointComp from "@/components/worldPointComp/index"


export default function (Vue) {
    Vue.use(MapBoxComp)
    Vue.use(WorldComp)
    Vue.use(WorldPointComp)
}