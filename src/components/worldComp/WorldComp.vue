<template>
  <div id="map_world"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import { Mapbox } from "@antv/l7-maps";
import { Scene, PolygonLayer, LineLayer, Popup } from "@antv/l7";
export default {
  name: "WorldComp",
  setup() {
    const scene = ref({}); // 初始化数据
    const worldPolygonLayer = ref(null); //世界地图 - 图层
    const layer2 = ref(null); // 图层边界
    const hightLayer = ref(null); // 点击选中后 高亮

    //获取 世界地图的 json数据
    const getMap = () => {
      fetch("world.json")
        .then((res) => res.json())
        .then((data) => {
          worldPolygonLayer.value = new PolygonLayer({
            autoFit: false,
          })
            .source(data)
            .shape("fill")
            .active(true)
            .style({
              opacity: 1,
            });
          //  图层边界
          layer2.value = new LineLayer({
            zIndex: 2,
          })
            .source(data)
            .color("rgb(93,112,146)")
            .size(0.6)
            .style({
              opacity: 1,
            });
          // 点击选中后 高亮
          hightLayer.value = new LineLayer({
            zIndex: 4, // 设置显示层级
            name: "hightlight",
          })
            .source({
              type: "FeatureCollection",
              features: [],
            })
            .shape("line")
            .size(2)
            .color("red")
            .style({
              opacity: 1,
            });

          // 鼠标点击事件
          worldPolygonLayer.value.on("click", (feature) => {
            // console.log(feature);
            hightLayer.value.setData({
              type: "FeatureCollection",
              features: [feature.feature],
            });
          });
          // 鼠标悬浮事件
          worldPolygonLayer.value.on("mousemove", (e) => {
            const popup = new Popup({
              offsets: [0, 0],
              closeButton: false,
            })
              .setLnglat(e.lngLat)
              .setHTML(
                `<span>中文名：${e.feature.properties.name}<br />英文名： ${e.feature.properties.name_en}</span>`
              );
            scene.value.addPopup(popup);
          });
        });
    };

    onMounted(() => {
      scene.value = new Scene({
        id: "map_world",
        map: new Mapbox({
          pitch: 0,
          style: "blank",
          center: [116.368652, 39.93866],
          zoom: 3,
        }),
      });
      scene.value.on("loaded", () => {
        getMap();
        setTimeout(() => {
          scene.value.addLayer(worldPolygonLayer.value);
          scene.value.addLayer(layer2.value);
          scene.value.addLayer(hightLayer.value);
        }, 1000);

        scene.value.render();
      });
    });
  },
};
</script>

<style></style>
