#!/bin/bash
cd /home/kavia/workspace/code-generation/personal-task-organizer-27960-27969/to_do_list_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

