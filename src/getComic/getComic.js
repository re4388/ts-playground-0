const axios = require('axios')
const fs = require('fs')
// import fetch from 'node-fetch'
const path = require('path')

// const imageUrl = 'https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/1-yijl/224.jpg';


// c4
// https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/3-2iel/1.jpg
//   https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/3-2iel/174.jpg


/**
 *
 *
 * c5
 *
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/4-rhm2/1.jpg
 *
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/4-rhm2/248.jpg
 *
 *
 * c6
 *
 * https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/5-fip7/1.jpg

 *
 * https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/5-fip7/215.jpg
 *
 * c7
 *
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/6-la04/1.jpg
 *
 * 207
 *
 * c8
 *
 * https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/7-uo9b/181.jpg
 *
 * 181?
 *
 *
 * c9
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/8-rgmx/1.jpg
 *
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/8-rgmx/202.jpg
 *
 *
 *
 *
 *
 * c10
 *
 * https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/9-4kon/1.jpg
 *
 *
 *149
 *
 *
 * c11
 *
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/10-r74j/1.jpg
 *
 * c12
 *
 * https://s2.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/11-5fwx/1.jpg
 *
 *
 * c13
 *
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/12-7x6d/1.jpg
 * c14
 *
 * https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/13-c8d1/1.jpg
 *
 * c15
 *
 * https://s1.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/14-7z5u/1.jpg
 *
 * c16
 *
 * https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/15-iq16/1.jpg
 *
 * c17
 *
 *
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/16-08iv/1.jpg
 * c18
 *
 * https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/17-y8td/1.jpg
 * c19
 *
 *
 * https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/18-1ze5/1.jpg
 * c20
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */






let chapArr = [
  `https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/5-fip7/1.jpg`,
  `https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/6-la04/1.jpg`,
  `https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/7-uo9b/181.jpg`,
  `https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/8-rgmx/1.jpg`,
  `https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/9-4kon/1.jpg`,
  `https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/10-r74j/1.jpg`,
  `https://s2.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/11-5fwx/1.jpg`,
  `https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/12-7x6d/1.jpg`,
  `https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/13-c8d1/1.jpg`,
  `https://s1.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/14-7z5u/1.jpg`,
  `https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/15-iq16/1.jpg`,
  `https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/16-08iv/1.jpg`,
  `https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/17-y8td/1.jpg`,
  `https://s1-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/18-1ze5/1.jpg`,
]


const waitInMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


//
// trySleep()
// async function trySleep() {
//   console.log('1')
//   await waitInMs(2000)
//   console.log('2')
//
// }




main2()

async function main2() {
  for (let i = 0; i < chapArr.length; i++) {
    let chapter = i + 5
    // console.log("=====> chapter: ", chapter);
    for (let j = 1; j <= 300; j++) {
      // console.log(chapArr[i].split('/').slice(0, -1).join('/') + '/' + `${j}` + '.jpg')
      let fileUrl = chapArr[i].split('/').slice(0, -1).join('/') + '/' + `${j}` + '.jpg'
      runAxios(fileUrl, chapter.toString())
    }
    await waitInMs(5000)
  }
}


// runAxios()
// main()

function main() {


  let urls = []

  for (let i = 1; i <= 200; i++) {
    const url = `https://s2-smb1-usla.baozicdn.com/scomic/silingfashiwojishitianzai-mantudezhuyuanzhuheiniaoshe/0/3-2iel/${i}.jpg`
    urls.push(url)
  }

  urls.forEach(url => runAxios(url, '5'))
}


function runAxios(url, chapter) {
  let imageUrlArr = url.split('/')
  let fileNameAndExt = imageUrlArr[imageUrlArr.length - 1]
  const localPath = path.join(__dirname, chapter, fileNameAndExt)

  axios({
    method: 'get',
    url: url,
    responseType: 'stream' // Tell axios to treat the response as a stream
  })
    .then(response => {
      if (response.status === 200) {
        // Create a writable stream to save the image data
        const writer = fs.createWriteStream(localPath)

        // Pipe the image data from the response to the writable stream
        response.data.pipe(writer)

        // Handle the completion of writing the image data
        writer.on('finish', () => {
          console.log('Image downloaded and saved to', localPath)
        })

        // Handle any errors during the download
        writer.on('error', (err) => {
          console.error('Error saving the image:', err.message)
        })
      } else {
        console.error('Failed to download the image. HTTP Status:', response.status)
      }
    })
    .catch(error => {
      console.error('Error fetching the image:', error.message)
    })

}


