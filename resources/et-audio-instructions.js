window.audio_instructions = (function () {
    let module = {};
    let context;
    let audio;
    let isPlaying = false;
    let button_selector = "";
    let playing_instruction_file_name = "";
    let finished_audio_list = [];

    module.instructions_button = function(instruction_file_name, auto_play, selector, skippable_after_first_play) {
        html = `<button class="jspsych-btn instructions-button" onclick="audio_instructions.start('${instruction_file_name}', '${selector}')">
                <img src="${utilities.getStimuliURL("instructions.png")}">
               </button>`;

        html += `<script type="text/javascript">
            audio_instructions.start('${instruction_file_name}', '${selector}');`
        if(typeof skippable_after_first_play !== 'undefined' && skippable_after_first_play) {
            html += `audio_instructions.enable_buttons('${selector}', '${instruction_file_name}');`
        }

        html += `</script>`;
        return html;
    }
    module.load = function(instruction_file_name) {
        $('body').append(`
        <a href="#" class="instructions-container" onclick="audio_instructions.start('` + instruction_file_name + `');">
            <img class="instructions" src="` + utilities.getStimuliURL("instructions.png")+ `"></img>
        </a>`);
    }

    module.unload = function() {
        $(".instructions-container").remove()
        context = null;
        audio = null;
    }

    module.enable_buttons = function(selector, audio_file_name) {
        if(typeof audio_file_name !== 'undefined' && finished_audio_list.indexOf(audio_file_name) !== -1) {
            $("button:disabled").prop('disabled', false);
            if(typeof selector !== 'undefined' && selector !== "") {
                $(selector).prop('disabled', false);
            }
        }
    }

    module.audio_ended = function() {
        if(finished_audio_list.indexOf(playing_instruction_file_name) == -1) {
            finished_audio_list.push(playing_instruction_file_name);
        }
        module.enable_buttons(button_selector, playing_instruction_file_name);
        isPlaying = false;
    }

    module.start = function(instruction_file_name, selector) {
        playing_instruction_file_name = instruction_file_name;
        context = jsPsych.pluginAPI.audioContext();
        isPlaying = true;
        module.stop(false);
        button_selector = selector;
        jsPsych.pluginAPI.getAudioBuffer(utilities.getStimuliURL(instruction_file_name))
            .then(function (buffer) {
                if (context !== null) {
                    audio = context.createBufferSource();
                    audio.buffer = buffer;
                    audio.connect(context.destination);
                    audio.loop = false;
                    audio.start(0);
                } else {
                    audio = buffer;
                    audio.currentTime = 0;
                    audio.loop = false;
                    audio.play();
                }

                audio.addEventListener('ended', module.audio_ended);
            })
            .catch(function (err) {
                console.log(err);
                console.error('Audio file failed to load')
            });
    }

    module.stop = function(unload = true) {
        if(typeof audio != 'undefined' && audio !== null) {
            audio.removeEventListener('ended', module.audio_ended);
            if (context !== null) {
                audio.stop();
            } else {
                audio.pause();
            }
        }
        if(unload) {
            module.unload();
        }
    }

    return module;
})();
