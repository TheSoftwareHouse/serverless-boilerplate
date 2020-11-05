TMPFILE=/var/tmp/offline$$.log
if [ -f .offline.pid ]; then
    echo "Found file .offline.pid. Not starting."
    exit 1
fi

./node_modules/.bin/serverless offline -s dev --httpPort 1337 2>1 > $TMPFILE &
PID=$!
echo $PID > .offline.pid

while ! grep "last request" $TMPFILE
do sleep 1; done

rm $TMPFILE