minikube start --driver=docker --container-runtime=containerd \
  --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers

minikube addons enable dashboard
kubectl label node minikube edgenode=true
