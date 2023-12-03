<script setup>
import { getCarDirection } from "@/api/kakao";
import { ref, watch, onMounted } from "vue";
import "@/assets/scss/4_components/PlanRouteMap.scss";
var map;
var infowindow;
var polylines = [];
const positions = ref([]);
const markers = ref([]);
const lineColor = ["#FF0060", "#FA7100", "#00DFA2", "#0079FF", "#27005D", "#3F1D38", "#000000"];
const sections = ref([]);
const searchURL = ref([]);
const attrList = ref([]);
var repIdx = 1;

const props = defineProps({ attractions: Array, makeMapFlag: Boolean });

const emit = defineEmits(["routeTaxi,routeRoad,routeLength,routeTime"]);
const taxi = ref();
const road = ref();
const length = ref();
const time = ref();

// var param = {
//   // origin: "",
//   // waypoints: "",
//   // destination: "",
// };

// watch(
//   () => props.selectStation.value,
//   () => {
//     // 이동할 위도 경도 위치를 생성합니다
//     var moveLatLon = new kakao.maps.LatLng(props.selectStation.lat, props.selectStation.lng);

//     // 지도 중심을 부드럽게 이동시킵니다
//     // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
//     map.panTo(moveLatLon);
//   },
//   { deep: true }
// );

watch(
  () => props.makeMapFlag.value,
  () => {
    console.log("makeMapFlag : 변경감지");
    if (window.kakao && window.kakao.maps) {
      console.log(props.makeMapFlag);
      if (props.makeMapFlag) {
        if (positions.value.length > 1) {
          attrList.value = JSON.parse(JSON.stringify(props.attractions));
          getDirection();
        }
      }
    }
  },
  { deep: true }
);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

watch(
  () => props.attractions.value,
  () => {
    console.log("변경 감지");
    if (window.kakao && window.kakao.maps) {
      positions.value = [];
      console.log("attractions 아래");
      console.log(props.attractions);
      props.attractions.forEach((attraction) => {
        let obj = {};
        obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
        obj.title = attraction.title;
        positions.value.push(obj);
      });
      // console.log(props.stations);
      if (positions.value.length > 0) {
        loadMarkers();
        repIdx = 1;
      }
      // const startPoint = props.attractions[0];
      // const endPoint = props.attractions[props.attractions.length - 1];
      // param.origin = `${startPoint.longitude},${startPoint.latitude}`;
      // param.destination = `${endPoint.longitude},${endPoint.latitude}`;
      // for (var i = 1; i < props.attractions.length - 1; i++) {
      //   if (i > 1) {
      //     param.waypoints += " | ";
      //   }
      //   param.waypoints += `${props.attractions[i].longitude},${props.attractions[i].latitude}`;
      // }
      // console.log(param.waypoints);
    }
  },
  { deep: true }
);

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  console.log("attractions 아래 init");
  console.log(props.attractions);
  positions.value = [];
  props.attractions.forEach((attraction) => {
    console.log(attraction.latitude);
    console.log(attraction.longitude);
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
    obj.title = attraction.title;
    positions.value.push(obj);
  });
  console.log(positions);
  // console.log(props.stations);
  if (positions.value.length > 0) {
    loadMarkers();
    if (positions.value.length > 1) {
      repIdx = 1;
      attrList.value = JSON.parse(JSON.stringify(props.attractions));
      getDirection();
    }
  }
  // loadMarkers();
};

const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers();

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // 마커를 생성합니다
  markers.value = [];
  var idx = 0;
  positions.value.forEach((position) => {
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
    var imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
    var imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx++ * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    // console.log("idx" + idx);
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      // clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);
    (function (marker, title) {
      kakao.maps.event.addListener(marker, "mouseover", function () {
        marker.setZIndex(3);
        displayInfowindow(marker, title);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
    })(marker, position.title);
  });

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );

  map.setBounds(bounds);
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};

function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

  infowindow.setContent(content);
  infowindow.open(map, marker);
}

const getDirection = () => {
  const startPoint = attrList.value[0];
  const endPoint = attrList.value[attrList.value.length - 1];
  const param = {};
  param.waypoints = "";
  param.origin = `${startPoint.longitude},${startPoint.latitude}`;
  param.destination = `${endPoint.longitude},${endPoint.latitude}`;
  // param.alternatives = true;
  for (var i = 1; i < attrList.value.length - 1; i++) {
    if (i > 1) {
      param.waypoints += " | ";
    }
    param.waypoints += `${attrList.value[i].longitude},${attrList.value[i].latitude}`;
  }
  console.log(param.waypoints);
  searchURL.value = [];
  for (var i = 0; i < props.attractions.length - 1; i++) {
    searchURL.value.push(
      `http://map.naver.com/index.nhn?slng=${props.attractions[i].longitude}&slat=${
        props.attractions[i].latitude
      }&stext=${props.attractions[i].title}&elng=${props.attractions[i + 1].longitude}&elat=${
        props.attractions[i + 1].latitude
      }&etext=${props.attractions[i + 1].title}&menu=route&pathType=1`
    );
  }

  getCarDirection(
    param,
    ({ data }) => {
      console.log("getCarDirection 호출");
      console.log(data.routes);
      if (data.routes[0].result_code === 0) {
        emit("routeTaxi", data.routes[0].summary.fare.taxi);
        emit("routeRoad", data.routes[0].summary.fare.toll);
        emit("routeLength", data.routes[0].summary.distance);
        emit("routeTime", data.routes[0].summary.duration);
        taxi.value = data.routes[0].summary.fare.taxi;
        road.value = data.routes[0].summary.fare.toll;
        length.value = data.routes[0].summary.distance;
        time.value = data.routes[0].summary.duration;
        console.log("택시 요금 : " + data.routes[0].summary.fare.taxi + "원");
        console.log("통행 요금 : " + data.routes[0].summary.fare.toll + "원");
        console.log("총 거리 : " + data.routes[0].summary.distance + "미터");
        console.log("목적지까지 소요 시간 : " + data.routes[0].summary.duration + "초");
        var linePath = [];
        var polyline;
        sections.value = data.routes[0].sections;
        console.log(sections.value);
        polylines.forEach((line) => {
          line.setMap(null);
        });
        polylines = [];
        data.routes[0].sections.forEach((section, index) => {
          linePath = [];
          section.roads.forEach((router) => {
            router.vertexes.forEach((vertex, index) => {
              // x,y 좌표가 우르르 들어옵니다. 그래서 인덱스가 짝수일 때만 linePath에 넣어봅시다.
              // 저도 실수한 것인데 lat이 y이고 lng이 x입니다.
              if (index % 2 === 0) {
                linePath.push(
                  new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index])
                );
              }
            });
          });
          polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: lineColor[index],
            strokeOpacity: 0.7,
            strokeStyle: "solid",
          });
          polyline.setMap(map);
          polylines.push(polyline);
        });
      } else {
        replaceCarDirection(data.routes[0].result_code);
      }
      // data.routes[0].sections[0].roads.forEach((router) => {
      //   router.vertexes.forEach((vertex, index) => {
      //     // x,y 좌표가 우르르 들어옵니다. 그래서 인덱스가 짝수일 때만 linePath에 넣어봅시다.
      //     // 저도 실수한 것인데 lat이 y이고 lng이 x입니다.
      //     if (index % 2 === 0) {
      //       linePath.push(
      //         new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index])
      //       );
      //     }
      //   });
      // });
      // var polyline = new kakao.maps.Polyline({
      //   path: linePath,
      //   strokeWeight: 5,
      //   strokeColor: "#000000",
      //   strokeOpacity: 0.7,
      //   strokeStyle: "solid",
      // });
      // polyline.setMap(map);
    },
    (error) => {
      console.log(error);
    }
  );
};

const replaceCarDirection = async (resultCode) => {
  var ps = new kakao.maps.services.Places();
  console.log("repIdx : " + repIdx);
  if (resultCode === 102) {
    var attr = attrList.value[0];
    ps.keywordSearch(attr.title, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (data.length > repIdx) {
          attr.latitude = data[repIdx].y;
          attr.longitude = data[repIdx].x;
        } else {
          return;
        }
      } else {
        return;
      }
    });
  } else if (resultCode === 103) {
    var attr = attrList.value[attrList.value.length - 1];
    ps.keywordSearch(attr.title, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (data.length > repIdx) {
          attr.latitude = data[repIdx].y;
          attr.longitude = data[repIdx].x;
        } else {
          return;
        }
      } else {
        return;
      }
    });
  } else if (resultCode === 101) {
    for (var i = 1; i < attrList.value.length - 1; i++) {
      var attr = attrList.value[i];
      ps.keywordSearch(attr.title, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          if (data.length > repIdx) {
            attr.latitude = data[repIdx].y;
            attr.longitude = data[repIdx].x;
          } else {
            return;
          }
        } else {
          return;
        }
      });
    }
  } else {
    return;
  }
  getDirection();
};
</script>

<template>
  <section class="section-map">
    <div id="map"></div>
    <div class="map-route">
      <li v-for="(item, index) in props.attractions">
        <p
          :style="{
            borderColor: lineColor[index],
            borderWidth: 1,
            color: lineColor[index],
          }"
        >
          {{ item.title }}
        </p>
        <div class="map-route-sub">
          <div v-if="sections.length > 0 && sections.length > index">
            거리 : {{ parseInt(sections[index].distance / 1000) }}km, 시간 :
            {{ parseInt(sections[index].duration / 3600) }}시간
            {{ parseInt(sections[index].duration % 60) }}분
          </div>
          <span class="material-symbols-outlined" :style="{ color: lineColor[index] }">
            keyboard_double_arrow_down
          </span>
          <a
            v-if="searchURL.length > 0 && searchURL.length > index"
            :href="searchURL[index]"
            :style="{
              display: block,
            }"
            target="_blank"
            >길찾기</a
          >
        </div>
      </li>
      <div class="show-dir-pay">
        <p>택시 요금 : {{ taxi }}원</p>
        <p>통행 요금 : {{ road }}원</p>
        <p>총 거리 : {{ parseInt(length / 1000) }}km</p>
        <p>시간 : {{ parseInt(time / 3600) }}시간 {{ parseInt(time % 60) }}분</p>
      </div>
    </div>
  </section>
</template>

<style>
.section-map {
  display: flex;
}
#map {
  width: 70%;
  height: 500px;
}
.map-route {
  width: 30%;
  height: 500px;
  overflow-y: scroll;
}
.map-route > li {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
}
.map-route > li > p {
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #b2b2b2;
  margin: 10px;
  text-align: center;
}
.map-route > li > span {
  margin: 0 auto;
}
.map-route > li:last-child > div {
  display: none;
}
.map-route-sub {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.map-route-sub div {
  margin: 0 10px;
}
.map-route-sub a {
  cursor: pointer;
  border: 1px solid;
  border-radius: 5px;
  padding: 10px 20px;
}
.show-dir-pay {
  padding: 10px;
  width: fit-content;
  margin: 0 auto;
  border-radius: 15px;
}

@media screen and (max-width: 992px) {
  .map-wrap {
  }
  .section-map {
    display: flex;
    align-items: center;
  }
  div .plan .plan-right-wrap .plan-right-main .map-wrap #map {
    margin-left: 10px;
    width: 50%;
    height: 300px;
  }
  div .plan .plan-right-wrap .plan-right-main .map-wrap .map-route {
    display: block;
    width: 50%;
    height: 300px;
    margin: 40px 0;
    margin-right: 10px;
  }
}
@media screen and (max-width: 768px) {
}
</style>
