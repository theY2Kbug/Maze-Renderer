# Maze Renderer

Maze renderer is a javascript implementation of the classic Wolfenstein 3D rendering engine created using the p5.js library. The maze renderer can be split into two components, the maze generation and rendering the boundaries seen within the view cone.

### Deployment

https://they2kbug.github.io/Maze-Renderer/

## Maze Generation

A grid is first defined depending on the viewport width and height. The first 16 columns and 9 rows are left for displaying the rendered scene (the rendered screen can be toggled to fullscreen) while the remaining grids are used for generating the maze. The maze is generated using recursive backtracking. A new instance of the maze is generated everytime the page is loaded or refreshed.

<div align="center"> 
  <img src="https://user-images.githubusercontent.com/76219678/164594853-4e5519e5-b77e-4b70-bc3b-726c70f9a3fc.gif" alt="maze generation">
</div>

## Rendering the boundaries within viewcone

A 3D perspective is generated using the 2D map visible within the view cone. Rays are cast at increments of 0.1 degrees from the player with a 60 degrees FOV.
Each ray is mapped to specific height depending on where it intersects with the wall, and the varying height difference generates the 3D perspective.

<div align="center"> 
  <img src="https://user-images.githubusercontent.com/76219678/178500131-dfd830e0-8406-4c4e-a8a6-4c0476ce05ac.gif" alt="rendered scene">
</div>

<b> Note: </b> In this context, "ray" refers to the distance  of each ray from the player (majenta circle) to the closest boundary within FOV

##

For a detailed implementation of ray casting, refer to https://lodev.org/cgtutor/raycasting.html
