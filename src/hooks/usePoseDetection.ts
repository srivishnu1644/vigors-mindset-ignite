
import { useEffect, useRef } from "react";
import { pipeline } from "@huggingface/transformers";

// Type for a single keypoint
type Keypoint = {
  x: number;
  y: number;
  score: number;
  name?: string;
};

type PoseResult = {
  keypoints: Keypoint[];
};

// NOTE for developers: The "image-to-pose" pipeline does not exist in
// @huggingface/transformers. This is kept for future support.
// For now, this hook will throw an error and not attempt model loading.
//
// If HuggingFace adds a supported browser-based pose detection, you may
// update the pipeline name accordingly.

export function usePoseDetection(
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  // Refs for pose detector and animation frame
  const detectorRef = useRef<any>(null);
  const runningRef = useRef<boolean>(true);

  useEffect(() => {
    let shouldRun = true;

    async function setupDetector() {
      try {
        // There is currently NO supported pipeline for pose detection in transformers.js
        // See: https://github.com/huggingface/transformers.js/issues
        throw new Error(
          "Pose detection is not supported in @huggingface/transformers. Please check for future updates."
        );
        // Example for the future:
        // const pose = await pipeline("image-to-pose", "Xenova/movenet-singlepose-lightning", { device: "webgpu" });
        // detectorRef.current = pose;
      } catch (err) {
        // fallback: notify error
        console.error("Pose model failed to load:", err);
      }
    }
    setupDetector();

    return () => {
      runningRef.current = false;
    };
  }, []);

  useEffect(() => {
    runningRef.current = true;

    async function detectLoop() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || !detectorRef.current) {
        requestAnimationFrame(detectLoop);
        return;
      }
      if (video.readyState < 2) {
        // wait for video
        requestAnimationFrame(detectLoop);
        return;
      }

      // Draw video frame into canvas
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        requestAnimationFrame(detectLoop);
        return;
      }
      // Match canvas size to video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Run model
      try {
        // This will not run as pose model is not assigned until supported
        // const poseResult: PoseResult = await detectorRef.current(video);
        // if (poseResult && Array.isArray(poseResult.keypoints)) {
        //   drawPose(ctx, poseResult.keypoints);
        // }
      } catch (e) {
        // avoid console spam
      }

      // Next frame
      if (runningRef.current) requestAnimationFrame(detectLoop);
    }

    if (detectorRef.current) detectLoop();

    return () => {
      runningRef.current = false;
    };
    // deliberately NOT tracking detectorRef changes
  }, [videoRef, canvasRef]);

  // Drawing utility (works when poseResult is available)
  function drawPose(ctx: CanvasRenderingContext2D, keypoints: Keypoint[]) {
    ctx.save();
    ctx.lineWidth = 4;
    keypoints.forEach((k) => {
      if (k.score > 0.3) {
        ctx.beginPath();
        ctx.arc(k.x, k.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#fbbf24";
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 6;
        ctx.fill();
      }
    });
    ctx.restore();

    const skeleton = [
      [0,1],[1,3],[0,2],[2,4], // head & arms
      [0,5],[0,6],[5,6],       // chest
      [5,7],[7,9],             // left arm
      [6,8],[8,10],            // right arm
      [5,11],[6,12],           // torso
      [11,12],[11,13],[13,15], // left leg
      [12,14],[14,16],         // right leg
    ];
    ctx.save();
    ctx.strokeStyle = "#a21caf";
    ctx.lineWidth = 3;
    skeleton.forEach(([a, b]) => {
      const kp1 = keypoints[a], kp2 = keypoints[b];
      if (kp1 && kp2 && kp1.score > 0.3 && kp2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
      }
    });
    ctx.restore();
  }
}
