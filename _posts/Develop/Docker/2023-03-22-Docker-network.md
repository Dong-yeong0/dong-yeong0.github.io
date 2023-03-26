---
layout: post
title: "[Docker] Network"
date: 2023-03-22 20:22:00 +09:00
categories: [docker, network]
tags: [docker]
comments: true
---

## Network

Docker container는 각각 격리된 환경에서 실행되기 때문에 기본적으로 다른 container와 통신이 불가능 합니다. 하지만 여려 개의 컨테이너를 하나의 Docker network에 연결을 시키면 서로 통신이 가능해 집니다.

## Network type

```shell
docker network ls
```

docker network ls command로 Docker가 지원하는 network 방식을 확인해 볼 수 있습니다.

![Untitled](../../../assets/img/posts/docker/docker_network/docker-network-ls.png){: width="500px"}
_bridge, host, none 3가지가 나오게 됩니다._

<br />

**docker network ls** command options

- **-f, –filter=[] : 조회 시 필터링 기능** (많이 사용)
- --no-trunc : network 정보를 상세히 출력 (ID가 자세히 표시)
- -q, –quiet : 나머지 정보 제외하고 network ID만 표시

```shell
# driver가 bridge인 network 조회
docker network ls -f driver=bridge

# network 이름이 none인 network 조회
docker network ls -f name=none
```

<br />

Docker network는 **bridge**, **host**, **overlay**, **none** 등등 여러 목적에 따라 여러 종류를 지원하고 있습니다.

### bridge

Docker network의 기본 network driver 입니다. 

driver를 따로 지정하지 않는 경우 default로 들어가게 됩니다.

### host

host network는 container와 host 컴퓨터의 동일한 network에서 container를 돌리기 위해서 사용됩니다.

### none

현재 container의 networking을 비활성화 하는 driver 입니다.

<br />

## Create network

```shell
docker network create test-net
```
default network가 bridge인지 확인하기 위해 test-net 이라는 network를 생성합니다.

```shell
docker network ls -f name=test-net
```

![Untitled](../../../assets/img/posts/docker/docker_network/docker-test-net-ls.png)
_default인 bridge로 생성된 것을 확인할 수 있습니다._

## Netwokr information 

```shell
docker network inspect test-net
```

![Untitled](../../../assets/img/posts/docker/docker_network/docker-network-inspect.png)
_이렇게 network에 대한 상세 정보가 출력됩니다._

위 사진에서 **Containers**라는 항목을 보면 해당 네트워크에 연결되어 있는 docker container가 없는 것을 확인할 수 있습니다.

## Network connect

먼저 **one** 이라는 container를 생성해줍니다.

```shell
docker run -itd --name one busybox

# result
Unable to find image 'busybox:latest' locally
latest: Pulling from library/busybox
4b35f584bb4f: Pull complete
Digest: sha256:b5d6fe0712636ceb7430189de28819e195e8966372edfc2d9409d79402a0dc16
Status: Downloaded newer image for busybox:latest
2c8e9d50dd615fe20c0d0b6705c9445d86d4269190b1255e529eddad5b7ecbc7
```

_busybox는 초소형 Unix 라고 생각하면 됩니다._

option

* --name: container 이름 지정
* -it: container를 종료하지 않고 터미널의 입력을 계속해서 container에게 전달
* -d: 백그라운드 환경으로 실행

<br/>

```shell
docker network inspect bridge
```

![Untitled](../../../assets/img/posts/docker/docker_network/one-network-connect.png)
_Container 생성 시 network를 지정 안하면 기본적으로 bridge로 연결이 되는걸 확인_

이제 **one container**에 test-net을 연결해보도록 하겠습니다. container에 network 연결 시 **docker network connect** command를 사용합니다.

```shell
# docker network connect "network name" "container name"
docker network connect test-net one
```

<br/>

연결 되었는지 확인하기 위해 **docker network inspect**로 확인해봅니다.

```shell
docker network inspect test-net

#result
"Containers": {
    "2c8e9d50dd615fe20c0d0b6705c9445d86d4269190b1255e529eddad5b7ecbc7": {
        "Name": "one",
        "EndpointID": "175d1f5eb0b81a8eb225bf1a49ff533e1562fe944ff1aee36fe40df199992b4e",     
        "MacAddress": "02:42:ac:12:00:02",
        "IPv4Address": "172.18.0.2/16",
        "IPv6Address": ""
    }
}
```

**one container**가 **test-net에 연결**된 것을 확인할 수 있습니다.

<br/>

## Disconnect network

한개의 container는 여러 개의 network를 포함할 수 있습니다. **one container** 생성 시 아무런 network를 지정 하지 않아 bridge에 연결되어 있는 상태입니다. 그 후 test-net에 연결해 준 상태여서 bridge와 test-net 두 개의 network에 연결되어 있는 상태입니다.

network의 연결을 끊는 command인 **docker network disconnect**를 사용하여 끊어보겠습니다

```shell
docker network disconnect bridge one

docker network inspect bridge

# result 
"Containers": {}
```

<br/>

## Container networking

이제 container간 통신을 확인하기 위해 또 다른 container를 two라는 이름으로 생성해줍니다.

```shell
docker run -itd --name two busybox

# result
fdec66873a494ac4747d2e05b5bdbfa5255e1222c1c862b9421462d7d590f872
```

<br/>

생성 후 두 container가 존재하는 지 확인 및 **two container의 network** 상태 확인

```shell
docker ps

# result
CONTAINER ID   IMAGE     COMMAND   CREATED          STATUS          PORTS     NAMES
fdec66873a49   busybox   "sh"      20 seconds ago   Up 19 seconds             two
2c8e9d50dd61   busybox   "sh"      23 hours ago     Up 52 seconds             one

docker network inspect bridge

# result
# 생략
"fdec66873a494ac4747d2e05b5bdbfa5255e1222c1c862b9421462d7d590f872": {
    "Name": "two",
    "EndpointID": "bbeec1bfe31c865c44ed6ee997e6b5ee6390566b47cde5bf78bbc96bc30de3ca",   
    "MacAddress": "02:42:ac:11:00:03",
    "IPv4Address": "172.17.0.3/16",
    "IPv6Address": ""
}
# 생략
```

<br/>

이제 **two container**가 **one container**에게 ping을 전달해 봅니다. (container간 통신을 위해)

```shell
# one container의 id address 확인
docker container inspect one

# result
# 생략
"Networks": {
    "test-net": {
        "IPAddress": "172.18.0.2",
    }
}
# 생략

docker exec two ping one
# result
# ctrl + c
```
**two container**의 반응이 전혀 나오지 않을겁니다. 왜냐하면 현재 **two container**의 network는 **bridge network**를 사용하고 있는 상태이고, **test-net network**를 가지고 있는 **one container**에게 전송을 하기 때문입니다.

**즉** 서로 network가 다르다는 얘기 입니다.

<br/>

이제, 여기서 **two container**에게 **test-net**을 연결시켜준다면 통신이 가능해집니다.

```shell
# docker network connect "network name" "container name"
docker network connect test-net two

docker network inspect test-net

# result 
"Containers": {
    "2c8e9d50dd615fe20c0d0b6705c9445d86d4269190b1255e529eddad5b7ecbc7": {
        "Name": "one",
        "EndpointID": "b5b4f1e5c2f301729a32c69d5dfdf6e2bc1190ded7264be336ca8b5c56ef410a",   
        "MacAddress": "02:42:ac:12:00:02",
        "IPv4Address": "172.18.0.2/16",
        "IPv6Address": ""
    },
    "fdec66873a494ac4747d2e05b5bdbfa5255e1222c1c862b9421462d7d590f872": {
        "Name": "two",
        "EndpointID": "b0cba77ad62e323efbedbd63a6f2503ed69332ed4a3a29128ce1327a0d591eb3",   
        "MacAddress": "02:42:ac:12:00:03",
        "IPv4Address": "172.18.0.3/16",
        "IPv6Address": ""
    }
},
```

이렇게 one, two container는 test-net에 연결이 된 것을 볼 수 있습니다.

<br/>

다시 **two container**가 **one container**에게 ping을 전달해 봅니다.

```shell
docker exec two ping one

# result
PING 172.18.0.2 (172.18.0.2): 56 data bytes                                                         
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.136 ms                                                
64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.138 ms                                                
64 bytes from 172.18.0.2: seq=2 ttl=64 time=0.365 ms                                                
64 bytes from 172.18.0.2: seq=3 ttl=64 time=0.324 ms                                                
64 bytes from 172.18.0.2: seq=4 ttl=64 time=0.329 ms
# ctrl + c
```

<br/>

반대로 one container가 two에게 ping을 던져보겠습니다.

```shell
docker exec one ping two

# result
PING one (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.183 ms
64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.411 ms
# ctrl + c
```

## End

이렇게 container 간 통신을 알아보았습니다.

더 자세한 Docker network를 알고싶다면 밑의 링크를 참고하시길 바랍니다.

* [Docker networking overview](https://docs.docker.com/network/)
* [Docker container networking](https://docs.docker.com/config/containers/container-networking/)

