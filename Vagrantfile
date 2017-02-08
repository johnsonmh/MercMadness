Vagrant.configure(2) do |config|

  config.vm.box = "edrw/centos7-64"
  config.vm.boot_timeout = 300

  config.vm.network "forwarded_port", guest: 8080, host: 8080 

  config.vm.provider "virtualbox" do |v, override|
    v.memory = 1024 
  end  

  config.vm.provision "shell", inline: <<-SHELL
    set -e
    yum -y update --exclude=kernel*
    yum -y install readline ca-certificates

    # Add docker repo to yum
    tee /etc/yum.repos.d/docker.repo <<-'EOF'
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/centos/7/
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg
EOF

    # Install docker
    yum -y install docker-engine
    systemctl enable docker.service
    systemctl start docker
    usermod -aG docker vagrant

    # Making the docker socket 777 because the vagrant user needs to be
    # in the docker group to use it.. we add the user to the docker
    # group above but that doesn't take effect until the next time the
    # user logs in.
    chmod 777 /var/run/docker.sock

    # Download and install docker-compose
    curl -s -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
    chmod 755 /usr/local/bin/docker-compose
    # Install pip
    curl -O https://bootstrap.pypa.io/get-pip.py
    python get-pip.py
    rm -f get-pip.py
  SHELL

end
