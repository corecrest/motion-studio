# Ranga launch video · Screenshot revision

The film uses seven supplied app screenshots. Home and Accounts establish the overview, Pay shows a selected beneficiary and amount, Activity leads to a recorded transaction, and Planned payments leads to a recurring internet bill. The USSD card is an explanatory graphic. Payment completion happens in the provider’s menu.

The embedded WebP files omit the Pay screen’s phone number and the receipt’s reference. The original uploads are kept outside the project. The existing Ranga icon and wordmark close the piece.

The composition uses a paused GSAP timeline, locally bundled assets and an original synthesized soundtrack. Edit `index.html`, `style.css` and `motion.js`. Run `python3 videos/ranga-launch/make-sound.py` to regenerate the retimed sound bed.

From the Motion Studio repository root, run `bash scripts/render.sh ranga-launch` to reproduce the export. The draft was rendered at 540 × 960 and 15 fps, with representative frames checked for readability and alignment. HyperFrames lint reports zero errors and one advisory about the single nested film clip. Delivery target is 25 seconds, 1080 × 1920 at 30 fps, H.264 (yuv420p) with stereo AAC.
