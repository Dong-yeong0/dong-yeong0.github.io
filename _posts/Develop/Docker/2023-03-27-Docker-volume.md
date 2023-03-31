---
layout: post
title: "[Docker] Volume"
date: 2023-03-27 19:40:00 +09:00
categories: [Docker, volume]
tags: [Docker]
comments: true
---

![Untitled](../../../assets/img/posts/docker/docker_logo.png){:width="400px"}

## Manage data in Docker

Docker container에서 저장된 데이터는 기본적으로 **container가 삭제될 때**, **저장된 데이터도 삭제**가 됩니다. 이런 상황이 발생하지 않도록 Docker에서 데이터를 영구적으로 저장해야 합니다.

이 때 Docker에서 기본적으로 container가 host system에 file을 저장하는 두 가지 옵션을 제공합니다.
첫 번째는 **volume** 두 번째로는 bind mount가 있습니다.


![Untitled](../../../assets/img/posts/docker/docker_volume/docker_volume_overview.png)
_[docker volume docs](https://docs.docker.com/storage/volumes/)_

## Volume

Docker volume은 container에서 생성이 되며, container의 데이터 유지를 위해 사용되는 메커니즘 입니다.

Docker에서 데이터를 영구적으로 관리할 수 있는 방법은 volume이랑 bind mount가 있다고 했는데,
volume은 bind mount에 비해 몇가지 장점이 있습니다.

- volume은 bind mount보다 백업 및 마이그레이션이 쉽습니다.
- 여러 container 간에 volume을 안전하게 공유할 수 있습니다.
- volume은 Linux 및 windows container 모두 작동됩니다. (호환성)
- Docker Desktop의 volume은 Mac 및 Windows host의 bind mount보다 높은 성능을 제공합니다.

## Bind mount

## Create volume

먼저, Docker에서 평범한 방법인 volume에 대해서 알아보겠습니다.

```shell
$ docker volume create test-volume
test-volume
```

### volume ls

```shell
docker volume ls
DRIVER              VOLUME NAME
local               test-volume
```

### docker volume inspect

```shell
docker volume inspect test-volume
[
    {
        "CreatedAt": "2023-03-29T18:03:46Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/test-volume/_data",
        "Name": "test-volume",
        "Options": {},
        "Scope": "local"
    }
]
```
