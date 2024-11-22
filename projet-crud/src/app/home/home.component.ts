import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngAfterViewInit(): void {
    this.createScene();
  }

  createScene(): void {
    const canvas = this.canvasRef.nativeElement;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Changer la couleur de fond de la scène
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    // Ajouter les contrôles de la souris
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Animation fluide
    controls.enableZoom = false; // Désactiver le zoom à la molette

    // Lumières
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 100, 0);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Charger le modèle 3D de livre
    const loader = new GLTFLoader();
    loader.load('assets/magic_frog/scene.gltf', (gltf) => {
      const frog = gltf.scene;

      // Agrandir le modèle du livre
      frog.scale.set(2.4, 2.4, 2.4); // Ajuste ces valeurs pour agrandir le modèle

      scene.add(frog);

      const animate = () => {
        requestAnimationFrame(animate);

        // Mettre à jour les contrôles pour permettre la rotation avec la souris
        controls.update();

        renderer.render(scene, camera);
      };

      animate();
    }, undefined, (error) => {
      console.error('An error occurred while loading the GLTF model:', error);
    });
  }
}
