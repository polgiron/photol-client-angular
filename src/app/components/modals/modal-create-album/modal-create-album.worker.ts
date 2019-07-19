/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  console.log('Web worker processing: ' + data.name);

  const reader = new FileReader();
  reader.onload = (readerEvent: any) => {
    // console.log('Reader loaded');
    postMessage(readerEvent.target.result);
  }

  reader.readAsDataURL(data);
});
