#!/bin/bash
# exit if no files changed
if [ -n "$(git status --porcelain | grep '.tsx\?$')" ]; then
    echo "Initializing unit tests...";
    yarn test --verbose
    RESULT=$?
    if [ $RESULT != 0 ]; then
        echo -e "\e[91m
     __________________________
    | Fix your fucking code..! |
    '--------------------------'
        \   ^__^
         \  (><)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
    "
        echo -e "\e[91mTests have failures. Commit rejected."
        cd ..
        exit 1
    else
        echo -e "\e[92m
         _____________
        | Good Job..! |
        '-------------'
                \   ^__^
                 \  (^^)\_______
                    (__)\       )\/\
                        ||----w |
                        ||     ||
        "
        cd ..
        exit 0
    fi;
    cd ..
    exit 0
fi;
