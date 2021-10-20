<template>
  <div>
    <div id="map_world_marker"></div>
  </div>
</template>

<script>
import { Scene, PolygonLayer, LineLayer, Marker, MarkerLayer, Popup } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
import { onMounted, reactive } from "vue";
export default {
  name: "WorldMarkerComp",
  setup() {
    const light_map_reac = reactive({
      scene: {}, // 初始化数据
      worldPolygonLayer: null, //世界地图 - 图层
      layer2: null, // 图层边界
      hightLayer: null, // 点击选中后 高亮
    });

    //获取 世界地图的 json数据
    const getMap = () => {
      fetch("world.json")
        .then((res) => res.json())
        .then((data) => {
          light_map_reac.worldPolygonLayer = new PolygonLayer({
            autoFit: false,
          })
            .source(data)
            // .color("name", [
            //   "rgb(239,243,255)",
            //   "rgb(189,215,231)",
            //   "rgb(107,174,214)",
            //   "rgb(49,130,189)",
            //   "rgb(8,81,156)",
            // ])
            .shape("fill")
            .active(true)
            .style({
              opacity: 1,
            });
          //  图层边界
          light_map_reac.layer2 = new LineLayer({
            zIndex: 2,
          })
            .source(data)
            .color("rgb(93,112,146)")
            .size(0.6)
            .style({
              opacity: 1,
            });
          // 点击选中后 高亮
          light_map_reac.hightLayer = new LineLayer({
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
          light_map_reac.worldPolygonLayer.on("click", (feature) => {
            console.log(feature);
            light_map_reac.hightLayer.setData({
              type: "FeatureCollection",
              features: [feature.feature],
            });
          });
          // 鼠标悬浮事件
          light_map_reac.worldPolygonLayer.on("mousemove", (e) => {
            const popup = new Popup({
              offsets: [0, 0],
              closeButton: false,
            })
              .setLnglat(e.lngLat)
              .setHTML(
                `<span>中文名：${e.feature.properties.name}<br />英文名： ${e.feature.properties.name_en}</span>`
              );
            light_map_reac.scene.addPopup(popup);
          });
        });
    };

    // 获取聚合点的数据
    const addMarkers = () => {
      fetch(
        "https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json"
      )
        .then((res) => res.json())
        .then((nodes) => {
          console.log(nodes);
          const markerLayer = new MarkerLayer({
            cluster: true,
          });
          for (let i = 0; i < nodes.features.length; i++) {
            console.log(nodes.features[i]);
            const { coordinates } = nodes.features[i].geometry;
            const marker = new Marker().setLnglat({
              lng: coordinates[0],
              lat: coordinates[1],
            });
            markerLayer.addMarker(marker);
          }
          light_map_reac.scene.addMarkerLayer(markerLayer);
        });
    };

    onMounted(() => {
      light_map_reac.scene = new Scene({
        id: "map_world_marker",
        map: new Mapbox({
          pitch: 0,
          style: "blank",
          center: [116.368652, 39.93866],
          zoom: 3,
        }),
      });
      light_map_reac.scene.on("loaded", () => {
        getMap();
        addMarkers();

        setTimeout(() => {
          light_map_reac.scene.addLayer(light_map_reac.worldPolygonLayer);
          light_map_reac.scene.addLayer(light_map_reac.layer2);
          light_map_reac.scene.addLayer(light_map_reac.hightLayer);
        }, 1000);

        light_map_reac.scene.render();
      });
    });
  },
};
</script>

<style></style>
