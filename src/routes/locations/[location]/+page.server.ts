import type { PageServerLoad } from "./$types";

type Prefecture = {
  [name: string]: {
    lat: number;
    lon: number;
  }
}

const prefectures: Prefecture = {
  "北海道": {
    lat: 43.063968,
    lon: 141.347899
  },
  "青森県": {
    lat: 40.824623,
    lon: 140.740593
  },
  "岩手県": {
    lat: 39.703531,
    lon: 141.152667
  },
  "宮城県": {
    lat: 38.268839,
    lon: 140.872103
  },
  "秋田県": {
    lat: 39.718600,
    lon: 140.102334
  },
  "山形県": {
    lat: 38.240437,
    lon: 140.363634
  },
  "福島県": {
    lat: 37.750299,
    lon: 140.467521
  },
  "茨城県": {
    lat: 36.341813,
    lon: 140.446793
  },
  "栃木県": {
    lat: 36.565725,
    lon: 139.883565
  },
  "群馬県": {
    lat: 36.391208,
    lon: 139.060156
  },
  "埼玉県": {
    lat: 35.857428,
    lon: 139.648933
  },
  "千葉県": {
    lat: 35.605058,
    lon: 140.123308
  },
  "東京都": {
    lat: 35.689521,
    lon: 139.691704
  },
  "神奈川県": {
    lat: 35.447753,
    lon: 139.642514,
  },
  "新潟県": {
    lat: 37.902418,
    lon: 139.023221
  },
  "富山県": {
    lat: 36.695290,
    lon: 137.211338
  },
  "石川県": {
    lat: 36.594682,
    lon: 136.625573
  },
  "福井県": {
    lat: 36.065219,
    lon: 136.221642
  },
  "山梨県": {
    lat: 35.664158,
    lon: 138.568449
  },
  "長野県": {
    lat: 36.651289,
    lon: 138.181224
  },
  "岐阜県": {
    lat: 35.391227,
    lon: 136.722291
  },
  "静岡県": {
    lat: 34.976978,
    lon: 138.383054
  },
  "愛知県": {
    lat: 35.180188,
    lon: 136.906565
  },
  "三重県": {
    lat: 34.730283,
    lon: 136.508591
  },
  "滋賀県": {
    lat: 35.004531,
    lon: 135.868590
  },
  "京都府": {
    lat: 35.021004,
    lon: 135.755608
  },
  "大阪府": {
    lat: 34.686316,
    lon: 135.519711
  },
  "兵庫県": {
    lat: 34.691279,
    lon: 135.183025
  },
  "奈良県": {
    lat: 34.685333,
    lon: 135.832744
  },
  "和歌山県": {
    lat: 34.226034,
    lon: 135.167506
  },
  "鳥取県": {
    lat: 35.503869,
    lon: 134.237672
  },
  "島根県": {
    lat: 35.472297,
    lon: 133.050499
  },
  "岡山県": {
    lat: 34.661772,
    lon: 133.934675
  },
  "広島県": {
    lat: 34.396560,
    lon: 132.459622
  },
  "山口県": {
    lat: 34.186121,
    lon: 131.470500
  },
  "徳島県": {
    lat: 34.065770,
    lon: 134.559303
  },
  "香川県": {
    lat: 34.340149,
    lon: 134.043444
  },
  "愛媛県": {
    lat: 33.841660,
    lon: 132.765362
  },
  "高知県": {
    lat: 33.559705,
    lon: 133.531080
  },
  "福岡県": {
    lat: 33.606785,
    lon: 130.418314
  },
  "佐賀県": {
    lat: 33.249367,
    lon: 130.298822
  },
  "長崎県": {
    lat: 32.744839,
    lon: 129.873756
  },
  "熊本県": {
    lat: 32.789828,
    lon: 130.741667
  },
  "大分県": {
    lat: 33.238194,
    lon: 131.612591
  },
  "宮崎県": {
    lat: 31.91109,
    lon: 131.423855
  },
  "鹿児島県": {
    lat: 31.560148,
    lon: 130.557981
  },
  "沖縄県": {
    lat: 26.212401,
    lon: 127.680932
  }
}

export const load: PageServerLoad = (async ({ url }) => {
  const overpassPromise = fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent('[out:json];area[name="') + url.pathname.split("/")[2] + encodeURIComponent('"];node(area)[tourism=attraction];out;'));
  const photosPromise = fetch("https://jsonplaceholder.typicode.com/photos/");
  const [overpassResponse, photosResponse] = await Promise.all([overpassPromise, photosPromise])

  const overpassData: Validation.Overpass = await overpassResponse.json();
  const elements = overpassData.elements;

  const photosData = await photosResponse.json();
  const photosOfSameSizeAsElements = photosData.slice(0, elements.length);

  photosOfSameSizeAsElements.forEach((photo: Validation.Photo) => {
    delete photo["id"];
    delete photo["albumId"];
  });

  let locations: Validation.LocationList = { locations: [] };
  for (let i = 0; i < elements.length; i++) {
    const locationKey = String(i);
    const locationValue: Validation.Element = Object.assign({}, elements[i], photosData[i]);
    const location = { [locationKey]: locationValue };
    locations["locations"].push(location);
  }
  let openGraph: Validation.OpenGraph = { title: "", description: "" }
  const prefectureName = url.pathname.split("/")[2]
  if (prefectureName === undefined) {
    openGraph = {
      title: "観光名所の一覧",
      description: "観光名所の一覧"
    }
  } else {
    openGraph = {
      title: decodeURIComponent(prefectureName) + "の観光名所の一覧",
      description: decodeURIComponent(prefectureName) + "の観光名所の一覧"
    }
  }

  const prefectureLocation = prefectures[decodeURIComponent(prefectureName)]

  const data = {
    ...locations,
    ...openGraph,
    ...prefectureLocation
  }
  return data;
})

export const prerender = false;
