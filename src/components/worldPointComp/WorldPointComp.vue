<template>
  <div id="map_world_point"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import { Mapbox } from "@antv/l7-maps";
import { Scene, PolygonLayer, LineLayer, Popup, PointLayer } from "@antv/l7";
export default {
  name: "WorldPointComp",
  setup() {
    const scene = ref({}); // 初始化数据
    const worldPolygonLayer = ref(null); //世界地图 - 图层
    const layer2 = ref(null); // 图层边界
    const hightLayer = ref(null); // 点击选中后 高亮
    const pointLayer = ref(null);

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

    // 获取 点 的数据
    const addPoint = () => {
      const pointData = [
        {
          Latitude: 28.391139,
          Longitude: -80.588343,
        },
        {
          Latitude: 34.4,
          Longitude: -120.35,
        },
        {
          Latitude: 27.931944,
          Longitude: -15.386667,
        },
        {
          Latitude: 50.8,
          Longitude: 59.516667,
        },
        {
          Latitude: 37.8,
          Longitude: -75.5,
        },
        {
          Latitude: 5.232,
          Longitude: -52.776,
        },
        {
          Latitude: 30.875014,
          Longitude: -3.065188,
        },
        {
          Latitude: 40.6,
          Longitude: 99.9,
        },
        {
          Latitude: 57.438136,
          Longitude: -152.344617,
        },
        {
          Latitude: 31.2,
          Longitude: 131.1,
        },
        {
          Latitude: 9.049117,
          Longitude: 167.743151,
        },
        {
          Latitude: 48.4,
          Longitude: 45.8,
        },
        {
          Latitude: 34.431867,
          Longitude: 127.535069,
        },
        {
          Latitude: 62.8,
          Longitude: 40.1,
        },
        {
          Latitude: 0.1,
          Longitude: -154,
        },
        {
          Latitude: 35.234722,
          Longitude: 53.920833,
        },
        {
          Latitude: -2.938333,
          Longitude: 40.2125,
        },
        {
          Latitude: 13.9,
          Longitude: 80.4,
        },
        {
          Latitude: 74.803859,
          Longitude: 36.610515,
        },
        {
          Latitude: 51.4,
          Longitude: 128.3,
        },
        {
          Latitude: 37.5,
          Longitude: 112.6,
        },
        {
          Latitude: 30.4,
          Longitude: 131,
        },
        {
          Latitude: 45.6,
          Longitude: 63.4,
        },
        {
          Latitude: -31.1,
          Longitude: 136.8,
        },
        {
          Latitude: 28.25,
          Longitude: 102,
        },
        {
          Latitude: 31.5,
          Longitude: 34.5,
        },
        {
          Latitude: 39.660083,
          Longitude: 124.705306,
        },
        {
          Latitude: -2.373056,
          Longitude: -44.396389,
        },
        {
          Latitude: 40.85,
          Longitude: 129.666667,
        },
      ];

      pointLayer.value = new PointLayer({})
        .source(pointData, {
          parser: {
            type: "json",
            x: "Longitude",
            y: "Latitude",
          },
        })
        .shape("circle")
        .active(true)
        .animate(true)
        .size(56)
        .color("#4cfd47")
        .style({
          opacity: 1,
        });
    };

    onMounted(() => {
      scene.value = new Scene({
        id: "map_world_point",
        map: new Mapbox({
          pitch: 0,
          style: "blank",
          center: [116.368652, 39.93866],
          zoom: 3,
        }),
      });
      scene.value.on("loaded", () => {
        getMap();
        addPoint();
        setTimeout(() => {
          scene.value.addLayer(worldPolygonLayer.value);
          scene.value.addLayer(layer2.value);
          scene.value.addLayer(hightLayer.value);
          scene.value.addLayer(pointLayer.value);
        }, 1000);

        scene.value.render();
      });
    });
  },
};
</script>

<style></style>
