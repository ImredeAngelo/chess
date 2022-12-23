# Devel includes GCC and Make
FROM archlinux:base-devel-20221218.0.111778

# Compile Stockfish
WORKDIR /usr/src/stockfish
COPY ./Stockfish/src .
RUN make -j profile-build ARCH=x86-64 COMP=gcc 
# -C ./src 

# TODO: Remove src

ENTRYPOINT ["tail", "-f", "/dev/null"]
# CMD ["./stockfish"]