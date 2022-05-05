container_id=$(docker ps | grep "amazon/aws-stepfunctions-local" | grep "0.0.0.0:8083->8083/tcp" | awk '{ print $1 }')
docker container logs $container_id