import { MockedBlock, MockedBlockProps } from 'tests/MockedBlock';

const mockData = { user: 'Username', age: 20 };

describe('core/Block', () => {
  it('Block create', () => {
    const testBlock = new MockedBlock(mockData);
    expect(testBlock.getProps()).toEqual(mockData);
  });
  it('Block emits', () => {
    const mockCDM = jest.fn();
    const mockCDU = jest.fn();
    const mockCWU = jest.fn();

    const mockDataUpdated: Partial<MockedBlockProps> = { user: 'NewUser' };
    const mockDataMerged = { ...mockData, ...mockDataUpdated };
    class MockedEmitBlock extends MockedBlock {
      componentDidMount(props: MockedBlockProps) {
        mockCDM();
      }
      componentDidUpdate(oldProps: MockedBlockProps, newProps: MockedBlockProps) {
        mockCDU(oldProps, newProps);
        return false;
      }
      componentWillUnmount() {
        mockCWU();
      }
    }

    const mockBlock = new MockedEmitBlock(mockData);

    mockBlock.getContent();
    expect(mockCDM).toHaveBeenCalledTimes(1);

    mockBlock.setProps(mockDataUpdated);
    expect(mockCDU).toHaveBeenCalledWith(mockData, mockDataMerged);
    expect(mockCDU).toHaveBeenCalledTimes(1);

    mockBlock._checkInDom(false);
    expect(mockCWU).toHaveBeenCalledTimes(1);
  });
});
