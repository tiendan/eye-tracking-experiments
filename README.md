# Eye-Tracking Experiments for Gorilla
This repository contains the source code for modules used in eye-tracking experiments on Gorilla platform.

## Gorilla Project Configuration
- Create a new "Code Editor Task" on Gorilla
- Paste the contents of `MAIN.js` file in the 'Code > main' section of your task
- Paste the contents of `HEAD.html` in the "Advanced > Head" section of your task
- Update the `stimuli/translations.json` for your use. Make sure you only update the values, and not the JSON keys themselves (i.e. do not modify the `ok_button_label` key, but modify the `OK` value)
- Upload the contents of `stimuli` folder to the "Uploads > Stimuli" section of your task
- Upload the contents of `resources` folder to the "Uploads > Resources" section of your task
- Upload your audio files (in MP3 format) and images (preferably in JPG/PNG format) to the "Uploads > Stimuli" section of your task
- Prepare your data file according to the references included under `examples/stimuli` folder. At a bare minimum, it should contain columns for:
    - `id`: A unique trial ID
    - `picture1`, ... `pictureN`: Pictures to be shown in the trial. For example, if you want to show 3 pictures in your experiment, include `picture1`, `picture2` and `picture3`     columns
    - `audio`: Audio to be played during the trial.
- If you want to include any extra information, add them to new columns. These will be directly exported as Gorilla metrics during the experiments.
- If you want to specify practice trials before the actual experiment, create a similar file with only the 
- Upload your data files to the "Uploads > Stimuli" section of your task
- Define your metrics under "Experiment > Metrics" section of your task. The metrics available for the eye-tracking experiments are:
    - All the columns from your data files
    - `start_time`: Start time of the trial, w.r.t. the experiment start
    - `responses`: User responses during the experiment
    - `pictureN_name`: Filename of the Nth picture (one metric for each picture)
    - `pictureN_bbox`: Bounding box for the Nth picture (one metric for each picture)
    - `webgazer_data`: Gaze data for the trial.
    - `calibration_lost`: Specifies that the calibration was lost (i.e. subject face disappeared from camera view) during that trial.
    - `already_calibrated`: Whether the calibration was skipped because system was already calibrated.
    - `calibration_precision`: Calibration precision calculated during a validation trial.
    
   
If any of the aforementioned sections is not visible in the Gorilla UI, go to "Configuration > Toolbox" to enable it.