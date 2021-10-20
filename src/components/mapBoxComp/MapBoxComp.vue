<template>
  <div>
    <div id="map"></div>
  </div>
</template>
<script>
import { Scene } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
import { onMounted } from "vue";

export default {
  name: "MapBoxComp",
  setup() {
    const drawMap = () => {
      new Scene({
        id: "map",
        map: new Mapbox({
          style: "light",
          pitch: 0,
          center: [107.054293, 35.246265],
          zoom: 4.056,
        }),
      });
    };
    onMounted(() => {
      drawMap();
    });
  },
};
</script>
<style>
::-webkit-scrollbar {
  display: none;
}

html,
body {
  overflow: hidden;
  margin: 0;
}

#map {
  /* position: absolute;
  top: 0;
  bottom: 0; */
  width: 100%;
}
</style>
