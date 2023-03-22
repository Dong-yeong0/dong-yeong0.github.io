---
layout: post
title: "[Docker] Network"
date: 2023-03-22 20:22:00 +09:00
categories: [docker, network]
tags: [docker]
comments: true
---

## Network 🤔

Docker container는 각각 격리된 환경에서 실행되기 때문에 기본적으로 다른 container와 통신이 불가능 합니다. 하지만 여려 개의 컨테이너를 하나의 Docker network에 연결을 시키면 서로 통신이 가능해 집니다.

## Network type

```shell
docker image ls
```

위 command로 Docker가 지원하는 network 방식을 확인해 볼 수 있습니다.

![Untitled](../../../assets/img/posts/docker/docker_network/docker-network-ls.png){: width="500px"}
_bridge, host, none 3가지가 나오게 됩니다._

Container 생성 시 지원되는 network 방식은 크게 4가지 입니다.

### bridge

### host

### none
