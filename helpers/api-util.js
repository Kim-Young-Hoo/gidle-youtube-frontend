export async function getAllVideoTest() {
  const response = await fetch(
    "http://13.125.206.79:8000/videos/"
  );
  const data = await response.json();
  const video = data['data'];
  // for (const key in data) {
  //   video.push({
  //     id: key,
  //     ...data[key],
  //   });
  // }
  
  return video;
}



export async function getFeaturedVideo() {
  const allVideo = await getAllVideo();
  return allVideo.filter((video) => video.isFeatured);
}


export async function getVideoById(id) {
  const allVideo = await getAllVideo();
  return allVideo.find((video) => video.id === id);
}

export async function getFilteredVideo(dateFilter) {
  const { year, month } = dateFilter;
  const allVideo = await getAllVideo();

  let filteredEvents = allVideo.filter((video) => {
    const videoDate = new Date(video.date);
    return videoDate.getFullYear() === year && videoDate.getMonth() === month - 1;
  });

  return filteredEvents;
}
