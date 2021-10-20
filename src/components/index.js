import MapBoxComp from "@/components/mapBoxComp/index";
import WorldComp from "@/components/worldComp/index";
import WorldPointComp from "@/components/worldPointComp/index";
import WorldMarkerComp from "@/components/worldMarkerComp/index";


export default function (Vue) {
    Vue.use(MapBoxComp)
    Vue.use(WorldComp)
    Vue.use(WorldPointComp)
    Vue.use(WorldMarkerComp)
}