import * as THREE from 'three';
//引入相机控件
import{ OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load( './robot.glb', function ( gltf ) {
    const mm=gltf.scene;
    mm.scale.set(100, 100, 100); // 缩放模型
    mm.position.set(0, 0, 0); // 设置模型位置
	 mm.rotation.x=Math.PI/4;
	scene.add( mm );

}, undefined, function ( error ) {

	console.error( error );

} );


const stats = new Stats();
document.body.appendChild(stats.domElement);

//创建场景
const scene = new THREE.Scene();



const geometry = new THREE.BoxGeometry(100,50,20);

const material = new  THREE.MeshLambertMaterial({//MeshBasicMaterial不受光照影响
    color:0xff6666,//MeshLambertMaterial受光照影响
    transparent:true,
    opacity:0.5//透明度
})
//创建一个网格模型
const mesh = new THREE.Mesh(geometry,material);
//设置网格模型的位置
mesh.position.set(10,10,0);
//添加进场景中
scene.add(mesh);

//创建三维坐标轴
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

//创建一个相机对象
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(36,width/height,10,3000)
camera.position.set(250,200,200);//相机的位置
camera.lookAt(30,0,0);//看向哪个坐标S

//点光源
const pointLight = new THREE.PointLight(0x556622,2.9);
//光源位置
pointLight.position.set(400,100,200);//放在x轴
scene.add(pointLight);

//可视化点光源
const pointLightHelper = new THREE.PointLightHelper(pointLight,5);//光源大小
scene.add(pointLightHelper);


//环境光就是整体亮度
const ambient = new THREE.AmbientLight(0x990000,0.5);
scene.add(ambient);

//平行光
const directionalLight = new THREE.DirectionalLight(0x001100,3);
directionalLight.position.set(500,100,60);//起始
directionalLight.target = mesh;//目标，默认（0,0,0）。和起始一起确定光的方向
scene.add(directionalLight);
//平行光可视化
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,50,0xaabbcc);
scene.add(directionalLightHelper);

//创建一个渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);//canvas的宽高度
renderer.render(scene,camera);//执行一个渲染操作,相当于拍照
document.body.appendChild(renderer.domElement);


//渲染循环
function render(){
    stats.update();//刷新时间
    mesh.rotation.x+=Math.PI/34;
		mesh.rotateY(0.1);//改变位置，转起来

        mesh.translateZ(1);
        renderer.render(scene,camera);//不断更新
    requestAnimationFrame(render);
}
render();

//相机控件实例化
const controls = new OrbitControls(camera,renderer.domElement);
controls.addEventListener('change',function(){
/*     renderer.render(scene,camera); */
})

//更新画布的尺寸
window.onresize = function(){
    renderer.setSize(window.innerWidth,window.innerHeight);//渲染器重新设置一下大小
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}
