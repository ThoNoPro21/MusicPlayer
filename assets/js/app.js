"use strict";
const box=document.querySelector('.box')
const containerPlaylist=document.querySelector('.container-playlist')
const titleMusic=document.querySelector('.title-music')

const playMusic =document.querySelector('.play')
const pauseMusic =document.querySelector('.pause')

const nameMusic =document.querySelector('.name-music')
const imgMusic =document.querySelector('#image-music')
const cdMusic =document.querySelector('.image-music')
const bgMusic =document.querySelector('.player-top')
const pathMusic =document.querySelector('audio')

const range=document.querySelector('#range')
const nextRight=document.querySelector('.next-right')
const nextLeft=document.querySelector('.next-left')
const randomSong = document.querySelector('.random')
const repeatSong = document.querySelector('.repeat')


const app={
    indexSong:0,
    isRandom:false,
    isRepeat:false,
    songs: [
        {
            singer: 'Anh Quân Idol',
            name: 'Có anh ở đây rồi',
            image:'https://i.ytimg.com/vi/xEtzAaKeWJ8/maxresdefault.jpg',
            path:'./assets/music/CamOnViTatCaDJTrangChubbyRemix-AnhQuanIdol-7645829.mp3'
        },
        {
            singer: 'Chu Thúy Quỳnh',
            name: 'Ít nhưng dài lâu',
            image:'https://i1.sndcdn.com/artworks-avPewudMfGeOeLLN-TEXQvw-t500x500.jpg',
            path: './assets/music/ItNhungDaiLauDaiMeoRemix-ChuThuyQuynh-7565255.mp3'
        },
        {
            singer: 'Nal',
            name: 'Không bằng',
            image:'https://static.qobuz.com/images/covers/ja/zr/g2o7ngv8tzrja_600.jpg',
            path:'./assets/music/KhongBangRinMusicRemix-Na-7198440.mp3'
        },
        {
            singer: 'Orrin',
            name: 'Đau ở đây này',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/7/3/0/173093beb5db775c83c36a39f721aa81.jpg',
            path:'./assets/music/DauODayNayRemix-Orinn-8848646.mp3'
        },
        {
            singer: 'NaNak',
            name: 'Khuất lối',
            image:'https://i1.sndcdn.com/artworks-UVxYzGDLDnTlTkkL-zDMn4w-t500x500.jpg',
            path: './assets/music/khuatloi.mp3'
        } 
    ],
    render:function(){
        const listSong=this.songs.map((song,index) => {
            return `
                    <div class="playlist ${index===this.indexSong ? 'active' :''}" data-index="${index}" >
                        <div class="playlist-img">
                            <img src="${song.image}">
                        </div>
                        <div class="playlist-content">
                            <h2 class="playlist-song">
                                ${song.name}
                            </h2>
                            <p class="playlist-singer">
                                ${song.singer}
                            </p>
                        </div>
                    </div>
            `
        })
        containerPlaylist.innerHTML=listSong.join('')
        
    },
    handleEvent:function(){
        playMusic.addEventListener('click',function(e) { 
            pathMusic.play()
        })
        pauseMusic.addEventListener('click',function(e) {
            pathMusic.pause()
        })

        // play
        pathMusic.onplay=function() {
            app.player();
            cdMusicAnimate.play();
            
        };

        // pause
        pathMusic.onpause=function() {
            app.pauser();
            cdMusicAnimate.pause();
        };

        // Tien do bai hat
        pathMusic.ontimeupdate=function() {
            const test=(pathMusic.currentTime / pathMusic.duration*100);
            range.value=test;
        };

         //Tua bai hat
         range.onchange=function(e){
            pathMusic.currentTime=(pathMusic.duration /100 * e.target.value);
            pathMusic.play()
        };

        //Xu ly bai hat ket thuc
        pathMusic.onended=function(e){
            if(app.isRandom){
                nextRight.click();
            }else if(app.isRepeat){
                this.play();
            }
            else {
                nextRight.click();
            }

        };
      
        //Xu ly lap bai hat

        //Cd quay
        const cdMusicAnimate=cdMusic.animate([
           {
            transform:'rotate(360deg)'
           }
        ],{
            duration:10000,
            iterations:Infinity
        })
        cdMusicAnimate.pause();


        // Next bài 
        nextRight.addEventListener('click',function() {
            if(app.isRandom){
                app.randomSong();
                app.player();
            }
            app.nextSong();
            pathMusic.play()
            app.player();
            app.render();
        });

        // Prev bài
            nextLeft.addEventListener('click',function() {
                if(app.isRandom){
                    app.randomSong();
                    app.player();
                }
            app.prevSong();
            pathMusic.play()
            app.player();
            app.render();
            })

        // Random  bai
        randomSong.addEventListener('click', function(){
            app.isRandom=!app.isRandom
            randomSong.classList.toggle('randomActive',app.isRandom)
            
        });

        // Lap bai
        repeatSong.addEventListener('click', function(){
            app.isRepeat=!app.isRepeat
            repeatSong.classList.toggle('randomActive',app.isRepeat)
        });

        // click chon bai
        box.onclick=function(e){
            const songElement=e.target.closest('.playlist:not(.active)');
            if(songElement){
                app.indexSong=Number(songElement.dataset.index)
                app.load_player();
                app.render();
                pathMusic.play();
            }
        };

       
        
    },
    player:function(){
        pauseMusic.classList.add('active')
        playMusic.classList.remove('active')
    },
    pauser:function(){
            pauseMusic.classList.remove('active')
            playMusic.classList.add('active')
    },
    getIndexSong: function(){
        return this.songs[this.indexSong]
    },
    load_player: function(){
        const currentSong=this.getIndexSong();
        nameMusic.textContent=currentSong.name
        bgMusic.style.background=`linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('${currentSong.image}')`
        bgMusic.style.backgroundSize='cover'
        bgMusic.style.backgroundRepeat='no-repeat'
        bgMusic.style.backgroundPosition='center'
        imgMusic.src=currentSong.image
        pathMusic.src=currentSong.path
        
    },
    nextSong: function(){
        this.indexSong++; 
        if(this.indexSong>=this.songs.length){
            this.indexSong=0
        }
        app.load_player();
    }, 
    prevSong: function(){
        this.indexSong--; 
        if(this.indexSong<0){
            this.indexSong=this.songs.length-1
        }
        app.load_player();
    },
    randomSong:function(){
        let newIndexSong
        do{
            newIndexSong=Math.floor(Math.random() * this.songs.length);
        }while(newIndexSong===this.indexSong);
        this.indexSong=newIndexSong;
        this.load_player();
    },
    repeatSong: function(){
        this.indexSong=this.indexSong
        this.load_player();
    },
    start:function(){
        this.render();
        this.handleEvent();
        this.load_player();
    }

}
app.start()
