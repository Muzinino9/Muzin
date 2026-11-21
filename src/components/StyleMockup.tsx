import type { StyleOption } from '../data/studioData';

function Side({ col }: { col: string }) {
  return (
    <div className="flex w-[22%] flex-col gap-[6%] px-[3%] py-[8%]" style={{ background: col }}>
      <div className="h-[7%] w-[60%] rounded-[4px] bg-white/55" />
      <div className="h-[6%] rounded-[4px] bg-white/95" />
      <div className="h-[6%] w-[80%] rounded-[4px] bg-white/35" />
      <div className="h-[6%] w-[70%] rounded-[4px] bg-white/35" />
      <div className="h-[6%] w-[75%] rounded-[4px] bg-white/35" />
    </div>
  );
}

export function StyleMockup({ mock }: { mock: StyleOption['mock'] }) {
  if (mock.t === 'quiz') {
    return (
      <div className="flex h-full w-full text-[0px]">
        <div className="flex w-[28%] flex-col gap-[7%] p-[6%]" style={{ background: mock.side }}>
          <div className="h-[10%] w-[70%] rounded-[4px]" style={{ background: mock.acc }} />
          <div className="h-[22%] rounded-[8px] bg-white" />
          <div className="h-[22%] rounded-[8px] bg-white" />
        </div>
        <div className="flex flex-1 flex-col gap-[5%] p-[6%]" style={{ background: mock.bg }}>
          <div className="h-[13%] rounded-t-[8px]" style={{ background: mock.acc }} />
          <div className="h-[9%] rounded-[4px] border-[1.5px] border-[#E2DEF5]" />
          <div className="h-[9%] rounded-[4px] border-[1.5px] border-[#E2DEF5]" />
          <div className="h-[9%] rounded-[4px] border-[1.5px] border-[#E2DEF5]" />
          <div className="h-[10%] w-[70%] rounded-[6px]" style={{ background: mock.acc }} />
          <div className="mt-[4%] h-[13%] rounded-t-[8px]" style={{ background: mock.acc }} />
        </div>
      </div>
    );
  }

  if (mock.t === 'admin' || mock.t === 'pro') {
    const colors = mock.c || [];
    return (
      <div className="flex h-full w-full text-[0px]">
        <Side col={mock.side || '#3D2E7C'} />
        <div className="flex flex-1 flex-col gap-[5%] p-[5%]" style={{ background: mock.bg }}>
          {mock.t === 'pro' && (
            <div
              className="h-[24%] rounded-[8px]"
              style={{ background: 'linear-gradient(90deg,#1E6FE8,#12A8E8)' }}
            />
          )}
          <div className={`flex gap-[4%] ${mock.t === 'pro' ? 'h-[26%]' : 'h-[22%]'}`}>
            {colors.map((c, idx) =>
              mock.t === 'pro' ? (
                <div key={idx} className="flex-1 overflow-hidden rounded-[6px] bg-white">
                  <div className="h-[30%]" style={{ background: c }} />
                </div>
              ) : (
                <div key={idx} className="flex flex-1 items-center rounded-[6px] bg-white p-[6%]">
                  <div className="aspect-square w-[38%] rounded-full" style={{ background: c }} />
                </div>
              ),
            )}
          </div>
          <div className="flex flex-1 gap-[4%]">
            <div className="flex-[1.2] rounded-[6px] bg-white" />
            <div className="flex flex-1 items-end gap-[10%] rounded-[6px] bg-white px-[12%] py-[8%]">
              <div className="h-[70%] flex-1 rounded-[2px]" style={{ background: colors[1] }} />
              <div className="h-[50%] flex-1 rounded-[2px]" style={{ background: colors[2] }} />
              <div className="h-[60%] flex-1 rounded-[2px]" style={{ background: colors[3] }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mock.t === 'hp') {
    const colors = mock.c || [];
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#E9E6F7] text-[0px]">
        <div className="flex h-[92%] w-[38%] flex-col overflow-hidden rounded-[10px] bg-white">
          <div className="h-[24%] rounded-b-[14px]" style={{ background: mock.acc }} />
          <div className="grid flex-1 grid-cols-3 gap-[6%] p-[8%]">
            {colors.map((c, idx) => (
              <div key={idx} className="rounded-[5px]" style={{ background: c }} />
            ))}
          </div>
          <div className="h-[9%] border-t border-[#eee]" />
        </div>
      </div>
    );
  }

  if (mock.t === 'toska') {
    const bars = [50, 70, 85, 40, 65, 55, 90, 45];
    return (
      <div className="flex h-full w-full gap-[3%] p-[3%] text-[0px]" style={{ background: mock.side }}>
        <div className="flex w-[20%] flex-col gap-[6%] py-[6%]">
          <div className="h-[7%] rounded-[4px] bg-white/50" />
          <div className="h-[7%] rounded-[10px] bg-white" />
          <div className="h-[7%] w-[80%] rounded-[4px] bg-white/40" />
          <div className="mt-auto h-[28%] rounded-[8px] bg-white/25" />
        </div>
        <div className="flex flex-1 items-end gap-[4%] rounded-[12px] bg-white p-[6%]">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-[2px]"
              style={{ height: `${h}%`, background: i === 6 ? mock.acc : '#CBEFF0' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (mock.t === 'pastel') {
    const colors = mock.c || [];
    return (
      <div className="h-full w-full p-[4%] text-[0px]" style={{ background: mock.bg }}>
        <div className="flex h-full gap-[4%] rounded-[10px] bg-white p-[4%]">
          <div className="flex w-[16%] flex-col gap-[8%]">
            <div className="h-[8%] rounded-[4px] bg-[#6E5BD6]" />
            <div className="h-[6%] rounded-[4px] bg-[#EEE]" />
            <div className="h-[6%] rounded-[4px] bg-[#EEE]" />
          </div>
          <div className="flex flex-1 flex-col gap-[6%]">
            <div className="h-[36%] rounded-[8px] bg-[#DCD3FB]" />
            <div className="flex h-[20%] gap-[4%]">
              {colors.map((c, idx) => (
                <div key={idx} className="flex-1 rounded-[5px]" style={{ background: c }} />
              ))}
            </div>
            <div className="h-[12%] rounded-[4px] bg-[#F2F2F2]" />
            <div className="h-[12%] rounded-[4px] bg-[#F2F2F2]" />
          </div>
        </div>
      </div>
    );
  }

  if (mock.t === 'kertas') {
    return (
      <div className="flex h-full w-full flex-col gap-[6%] p-[6%] text-[0px]" style={{ background: mock.bg }}>
        <div className="flex items-center justify-between border-b border-[#E2DDD3] pb-[5%]">
          <div className="h-[8px] w-[42%] rounded-[2px] bg-[#22201E]" />
          <div className="h-[10px] w-[22%] rounded-[3px]" style={{ background: mock.acc }} />
        </div>
        <div className="flex flex-1 gap-[5%]">
          <div className="flex w-[36%] flex-col gap-[8%] rounded-[6px] border border-[#E2DDD3] bg-white p-[6%]">
            <div className="h-[14%] rounded-[3px] bg-[#EFEAE0]" />
            <div className="h-[14%] rounded-[3px] bg-[#EFEAE0]" />
            <div className="h-[14%] rounded-[3px] bg-[#EFEAE0]" />
            <div className="mt-auto h-[18%] rounded-[4px]" style={{ background: mock.acc }} />
          </div>
          <div className="flex flex-1 flex-col gap-[7%] rounded-[6px] border border-[#E2DDD3] bg-white p-[7%]">
            <div className="mx-auto h-[8%] w-[60%] rounded-[2px] bg-[#22201E]" />
            <div className="h-[2px] w-full bg-[#22201E]" />
            <div className="h-[7%] w-[85%] rounded-[2px] bg-[#E2DDD3]" />
            <div className="h-[7%] w-[70%] rounded-[2px] bg-[#E2DDD3]" />
            <div className="h-[7%] w-[80%] rounded-[2px] bg-[#E2DDD3]" />
          </div>
        </div>
      </div>
    );
  }

  if (mock.t === 'gelap') {
    return (
      <div className="flex h-full w-full text-[0px]" style={{ background: mock.bg }}>
        <div className="flex w-[22%] flex-col gap-[7%] px-[3%] py-[8%]" style={{ background: mock.side }}>
          <div className="h-[8%] w-[65%] rounded-[4px]" style={{ background: mock.acc }} />
          <div className="h-[6%] rounded-[4px] bg-[#1E293B]" />
          <div className="h-[6%] w-[80%] rounded-[4px] bg-white/15" />
          <div className="h-[6%] w-[70%] rounded-[4px] bg-white/15" />
        </div>
        <div className="flex flex-1 gap-[5%] p-[6%]">
          <div className="flex w-[42%] flex-col gap-[8%] rounded-[8px] border border-[#334155] bg-[#1E293B] p-[6%]">
            <div className="h-[14%] rounded-[4px] bg-[#0F172A]" />
            <div className="h-[14%] rounded-[4px] bg-[#0F172A]" />
            <div className="mt-auto h-[18%] rounded-[5px]" style={{ background: mock.acc }} />
          </div>
          <div className="flex flex-1 flex-col gap-[8%] rounded-[6px] bg-white p-[7%]">
            <div className="mx-auto h-[8%] w-[65%] rounded-[2px] bg-[#1E293B]" />
            <div className="h-[7%] w-[90%] rounded-[2px] bg-[#CBD5E1]" />
            <div className="h-[7%] w-[75%] rounded-[2px] bg-[#CBD5E1]" />
            <div className="h-[7%] w-[82%] rounded-[2px] bg-[#CBD5E1]" />
          </div>
        </div>
      </div>
    );
  }

  if (mock.t === 'merah') {
    return (
      <div className="flex h-full w-full flex-col text-[0px]" style={{ background: mock.bg }}>
        <div className="flex h-[18%] items-center justify-between px-[5%]" style={{ background: mock.acc }}>
          <div className="h-[40%] w-[36%] rounded-[3px] bg-white/90" />
          <div className="h-[42%] w-[16%] rounded-[4px] bg-white/25" />
        </div>
        <div className="flex flex-1 gap-[5%] p-[5%]">
          <div className="flex w-[24%] flex-col gap-[8%] rounded-[6px] bg-white p-[4%]">
            <div className="h-[14%] rounded-[3px] border-l-[3px] bg-[#FDE8EC]" style={{ borderColor: mock.acc }} />
            <div className="h-[12%] rounded-[3px] bg-[#EEF0F4]" />
            <div className="h-[12%] rounded-[3px] bg-[#EEF0F4]" />
          </div>
          <div className="flex flex-1 flex-col gap-[7%] rounded-[6px] bg-white p-[6%]">
            <div className="h-[12%] w-[55%] rounded-[3px] bg-[#1F2937]" />
            <div className="h-[12%] rounded-[4px] bg-[#F3F4F6]" />
            <div className="h-[12%] rounded-[4px] bg-[#F3F4F6]" />
            <div className="mt-auto h-[16%] w-[45%] rounded-[5px]" style={{ background: mock.acc }} />
          </div>
        </div>
      </div>
    );
  }

  if (mock.t === 'bento') {
    const grad = mock.c || ['#6366F1', '#06B6D4'];
    return (
      <div className="flex h-full w-full flex-col gap-[6%] p-[5%] text-[0px]" style={{ background: mock.bg }}>
        <div className="mx-auto flex h-[15%] w-[64%] items-center gap-[6%] rounded-full border border-[#E5E7EB] bg-white px-[6%]">
          <div className="h-[46%] flex-1 rounded-full" style={{ background: mock.acc }} />
          <div className="h-[46%] flex-1 rounded-full bg-[#E5E7EB]" />
          <div className="h-[46%] flex-1 rounded-full bg-[#E5E7EB]" />
        </div>
        <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-[5%]">
          <div
            className="col-span-2 rounded-[10px] p-[8%]"
            style={{ background: `linear-gradient(120deg, ${grad[0]}, ${grad[1]})` }}
          >
            <div className="h-[22%] w-[55%] rounded-[3px] bg-white/90" />
            <div className="mt-[8%] h-[16%] w-[35%] rounded-[3px] bg-white/40" />
          </div>
          <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-[10%]">
            <div className="h-[26%] w-[60%] rounded-[3px]" style={{ background: grad[0] }} />
          </div>
          <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-[10%]">
            <div className="h-[26%] w-[60%] rounded-[3px]" style={{ background: grad[1] }} />
          </div>
          <div className="col-span-2 flex items-center justify-between rounded-[10px] border border-[#E5E7EB] bg-white px-[8%]">
            <div className="h-[26%] w-[45%] rounded-[3px] bg-[#E5E7EB]" />
            <div className="h-[42%] w-[26%] rounded-[6px]" style={{ background: mock.acc }} />
          </div>
        </div>
      </div>
    );
  }

  if (mock.t === 'alam') {
    const sideCol = mock.side || '#1E4D3B';
    return (
      <div className="flex h-full w-full text-[0px]">
        <Side col={sideCol} />
        <div className="flex flex-1 flex-col gap-[6%] p-[6%]" style={{ background: mock.bg }}>
          <div className="flex h-[24%] items-center justify-between rounded-[10px] bg-white px-[7%]">
            <div className="h-[34%] w-[48%] rounded-[4px]" style={{ background: sideCol }} />
            <div className="h-[44%] w-[24%] rounded-full" style={{ background: mock.acc }} />
          </div>
          <div className="flex flex-1 gap-[5%]">
            <div className="flex flex-1 flex-col gap-[9%] rounded-[10px] bg-white p-[7%]">
              <div className="h-[14%] rounded-[4px] bg-[#E3EDE7]" />
              <div className="h-[14%] rounded-[4px] bg-[#E3EDE7]" />
              <div className="mt-auto h-[22%] rounded-[6px] bg-[#2B7A5B]" />
            </div>
            <div className="flex flex-1 flex-col gap-[9%] rounded-[10px] bg-white p-[7%]">
              <div className="h-[12%] w-[60%] rounded-[3px]" style={{ background: sideCol }} />
              <div className="h-[10%] w-[90%] rounded-[3px] bg-[#DCE7E0]" />
              <div className="h-[10%] w-[75%] rounded-[3px] bg-[#DCE7E0]" />
              <div className="h-[10%] w-[82%] rounded-[3px] bg-[#DCE7E0]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // cbt
  const sideCol = mock.side || '#12A383';
  return (
    <div className="flex h-full w-full text-[0px]">
      <Side col={sideCol} />
      <div className="flex flex-1 gap-[4%] p-[5%]" style={{ background: mock.bg }}>
        <div className="flex w-[34%] flex-col gap-[6%]">
          <div className="h-[18%] rounded-[6px] bg-white" />
          <div className="grid flex-1 grid-cols-4 content-start gap-[8%] rounded-[6px] bg-white p-[8%]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-[2px]"
                style={
                  i === 11
                    ? { border: `1.5px solid ${sideCol}`, background: '#fff' }
                    : { background: sideCol }
                }
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[7%] rounded-[6px] bg-white p-[7%]">
          <div className="mx-auto h-[8%] w-[50%] rounded-[3px]" style={{ background: sideCol }} />
          <div className="h-[18%] rounded-[3px] bg-[#EEE]" />
          <div className="h-[7%] w-[70%] rounded-[3px] bg-[#E4E4E4]" />
          <div className="h-[7%] w-[65%] rounded-[3px] opacity-60" style={{ background: sideCol }} />
          <div className="h-[7%] w-[70%] rounded-[3px] bg-[#E4E4E4]" />
          <div className="ml-auto mt-auto h-[10%] w-[35%] rounded-[4px]" style={{ background: sideCol }} />
        </div>
      </div>
    </div>
  );
}
