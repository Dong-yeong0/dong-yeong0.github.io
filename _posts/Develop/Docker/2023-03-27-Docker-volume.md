---
layout: post
title: "[Docker] Volume"
date: 2023-03-27 19:40:00 +09:00
categories: [Devops, Docker, volume]
tags: [Devops, Docker]
comments: true
---

![Untitled](../../../assets/img/posts/docker/docker_logo.png){:width="400px"}

## Manage data in Docker

Docker container에서 저장된 데이터는 기본적으로 **container가 삭제될 때**, **저장된 데이터도 삭제**가 됩니다.

예를 들어 mysql을 container로 올리고 다시 삭제하는 경우, **mysql에 저장 된 DB 정보도 함께 삭제**가 된다는 것!

이런 상황이 발생하지 않도록 Docker에서 데이터를 영구적으로 저장해야 합니다.

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

## Create volume

먼저, Docker에서 volume을 생성합니다.

```shell
# docker volume create --name {volume name}
docker volume create --name test-volume

# result
test-volume
```

<br/>

## Volume details

Docker가 관리하는 정보는 **docker inspect**로 확인이 가능합니다.

docker inspect command는 type에 container, image, volume 등 들어갈 수 있고, docker를 구성하는 단위의 정보를 확인할 때 유용합니다.

```shell
# docker inspect --type {volume, image, container} {name}
docker inspect --type volume test-volume

# result
[
    {
        "CreatedAt": "2023-03-30T11:50:20Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/test-volume/_data",
        "Name": "test-volume",
        "Options": {},
        "Scope": "local"
    }
]
```
<br/>

## Volume inquiry

volume을 조회할 때는 **docker volume ls** command를 사용합니다.

```shell
docker volume ls

# result
DRIVER              VOLUME NAME
local               test-volume
```

<br/>

## Remove the volume

```shell
# docker volume rm {volume name}
docker volume rm test-volume

# result
test-volume
```

만약, volume을 전체로 지울려고 할 땐

```shell
docker volume prune

# result
Are you sure you want to continue? [y/N] y                                                          
Deleted Volumes:                                                                                    
test-volume                                                                                         
                                                                                                    
Total reclaimed space: 0B 
```
