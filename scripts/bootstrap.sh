#!/bin/bash -xe
mkdir -p /etc/puppet/modules;
puppet module install --force --module_repository https://forge.puppet.com puppetlabs-apt;
puppet module install --force --module_repository https://forge.puppet.com puppetlabs-stdlib;
puppet module install --force --module_repository https://forge.puppet.com --version 3.9.0 puppetlabs-mysql;
puppet module install --force --module_repository https://forge.puppet.com --version 0.3.0 jfryman-nginx;
puppet module install --force --module_repository https://forge.puppet.com --version 3.0.2 petems-swap_file;
# Set up environment variables, adding the new tools to PATH.
sudo sh -c "cat > /etc/profile.d/composer.sh" <<'EOF'
export COMPOSER_HOME=/var/www/local.openstack.org
EOF
