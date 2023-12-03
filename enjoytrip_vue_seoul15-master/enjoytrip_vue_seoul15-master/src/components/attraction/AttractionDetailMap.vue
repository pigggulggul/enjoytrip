<script setup>
import { ref, watch, onMounted, computed } from "vue";

var map;
const positions = ref([]);
const markers = ref([]);

const props = defineProps({ attractionDetail: Object });
// const attraction = {
//   latitud: "127",
//   longitude: "127",
//   title: "gkgk",
// };

// const param = {
//   origin: "",
//   destination: "",
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

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    document.head.appendChild(script);
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
  }
});

// watch(
//   () => props.attractionDetail.value,
//   () => {
//     console.log(props.attractionDetail);
//     let obj = {};
//     positions.value = [];
//     if (Object.keys(props.attractionDetail).length !== 0) {
//       obj.latlng = new kakao.maps.LatLng(
//         props.attractionDetail.latitude,
//         props.attractionDetail.longitude
//       );
//       obj.title = props.attractionDetail.title;
//       positions.value.push(obj);
//     }
//     loadMarkers();
//     map.setLevel(7);
//     // const startPoint = props.stations[0];
//     // const endPoint = props.stations[props.stations.length - 1];
//     // param.origin = `${startPoint.lng},${startPoint.lat}`;
//     // param.destination = `${endPoint.lng},${endPoint.lat}`;
//   },
//   { immediate: true }
// );

watch(
  () => props.attractionDetail.value,
  () => {
    console.log("변경감지");
    console.log(props.attractionDetail);
    if (window.kakao && window.kakao.maps) {
      positions.value = [];
      let obj = {};
      obj.latlng = new kakao.maps.LatLng(
        props.attractionDetail.latitude,
        props.attractionDetail.longitude
      );
      obj.title = props.attractionDetail.title;
      positions.value.push(obj);
      loadMarkers();
      map.setLevel(7);
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

  if (
    typeof props.attractionDetail.latitude !== "undefined" &&
    props.attractionDetail !== null
  ) {
    console.log("init map 오니");
    console.log(props.attractionDetail);
    const lat = props.attractionDetail.latitude;
    const lng = props.attractionDetail.longitude;

    console.log(lat);
    console.log(lng);
    positions.value = [];
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(lat, lng);
    obj.title = props.attractionDetail.title;
    positions.value.push(obj);

    loadMarkers();
    map.setLevel(7);
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
  positions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);
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

// const getDirection = () => {
//   getCarDirection(
//     param,
//     ({ data }) => {
//       console.log("택시 요금 : " + data.routes[0].summary.fare.taxi + "원");
//       console.log("통행 요금 : " + data.routes[0].summary.fare.toll + "원");
//       console.log("총 거리 : " + data.routes[0].summary.distance + "미터");
//       console.log("목적지까지 소요 시간 : " + data.routes[0].summary.duration + "초");
//       const linePath = [];
//       data.routes[0].sections[0].roads.forEach((router) => {
//         router.vertexes.forEach((vertex, index) => {
//           // x,y 좌표가 우르르 들어옵니다. 그래서 인덱스가 짝수일 때만 linePath에 넣어봅시다.
//           // 저도 실수한 것인데 lat이 y이고 lng이 x입니다.
//           if (index % 2 === 0) {
//             linePath.push(
//               new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index])
//             );
//           }
//         });
//       });
//       var polyline = new kakao.maps.Polyline({
//         path: linePath,
//         strokeWeight: 5,
//         strokeColor: "#000000",
//         strokeOpacity: 0.7,
//         strokeStyle: "solid",
//       });
//       polyline.setMap(map);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// };
</script>

<template>
  <div id="map"></div>
  <!-- <button @click="getDirection">자동차 길찾기</button> -->
</template>

<style>
#map {
  width: 100%;
  height: 700px;
  z-index: 0;
}
</style>
