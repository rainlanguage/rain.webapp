The dynamic spread strategy with optional fast exit for market-making uses
time-based adjustments to maintain liquidity by narrowing spreads as market
conditions stabilize, while recalculating averages and trade sizes to mitigate
risks during trends.

The optional fast exit means that off-trend trades are sized to immediately
counter all previous on-trend trades, plus some small profit.

The goal is that this version of dynamic spread is more defensive during drawn
out trends, by aggressively resetting itself every opportunity that it has.

<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/ChKAr9uGrUY?si=3trkoeRJXFCvprPz"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/2KRAJreUA64?si=JupJH4CbiiCEp3MF"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

<style>
  .video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
