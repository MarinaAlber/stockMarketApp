import {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {httpClient} from '../../lib/api';
import {AxiosError} from 'axios';
import {getNextStockList, getStockList} from './services';
import {mapStockList, Stock} from './mappers';
import {Card} from '../Card';
import {BaseSpace, BorderRadius, DarkTheme, FontSizes} from '../../theme';

export const StocksList: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [stocksList, setStocksList] = useState<Stock[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(true);

  let abortFetchRequest: Function | undefined = undefined;

  const fetchStocks = async (notInitialLoad?: boolean) => {
    abortFetchRequest && abortFetchRequest();
    try {
      setIsLoading(true);
      const {xhr, abortRequest} =
        notInitialLoad && nextUrl
          ? getNextStockList(nextUrl)
          : getStockList({
              searchQuery: searchQuery || '',
            });
      abortFetchRequest = abortRequest;
      const response = await xhr;
      const mappedStocks = mapStockList(response.data.results);
      setNextUrl(response.data.next_url || null);
      setStocksList(prevState => [...prevState, ...mappedStocks]);
      setIsLoading(false);
      setHasError(false);
    } catch (error) {
      if (!httpClient.checkIsCancelError(error as AxiosError)) {
        console.error('something went wrong while fetching stocks', error);
      } else {
        setIsLoading(false);
        setHasError(true);
      }
    }
  };

  useEffect(() => {
    fetchStocks();
    return () => {
      abortFetchRequest && abortFetchRequest();
    };
  }, []);

  useEffect(() => {
    let delayDebounceFn = null;
    if (searchQuery !== null) {
      delayDebounceFn = setTimeout(() => {
        setNextUrl(null);
        setStocksList([]);
        fetchStocks();
      }, 500);
    }
    return () => {
      delayDebounceFn && clearTimeout(delayDebounceFn);
    };
  }, [searchQuery]);

  const renderCard = ({item}: ListRenderItemInfo<Stock>) => {
    return <Card title={item.ticker} subTitle={item.name} />;
  };
  const renderLoading = () => {
    if (isLoading && !hasError && !stocksList.length) {
      return <ActivityIndicator color={DarkTheme.primaryColor_200} />;
    }

    return null;
  };

  const renderEmptyState = () => {
    if (!isLoading && !stocksList.length && !hasError) {
      return (
        <Text allowFontScaling={false} style={styles.emptyList}>
          No Stocks Found
        </Text>
      );
    }
    if (!isLoading && hasError && !stocksList.length) {
      return (
        <Text allowFontScaling={false} style={styles.emptyList}>
          Something went wrong
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.listContainer}>
      <TextInput
        placeholder="Search for stocks"
        style={styles.searchInput}
        clearButtonMode="always"
        placeholderTextColor={DarkTheme.primaryColor_200}
        autoCorrect={false}
        onChangeText={value => {
          setSearchQuery(value);
        }}
      />
      {renderLoading()}
      <FlatList<Stock>
        data={stocksList}
        style={styles.list}
        numColumns={2}
        renderItem={renderCard}
        keyExtractor={item => item.ticker}
        onEndReached={() => {
          !isLoading && fetchStocks(true);
        }}
        horizontal={false}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: BaseSpace.md as number,
    gap: BaseSpace.md,
    flex: 1,
    backgroundColor: DarkTheme.primaryColor,
  },
  searchInput: {
    borderRadius: BorderRadius.xl,
    borderColor: DarkTheme.primaryColor_200,
    borderWidth: 1,
    margin: BaseSpace.lg as number,
    color: DarkTheme.primaryColor_100,
    padding: BaseSpace.md as number,
  },
  emptyList: {
    color: DarkTheme.primaryColor_200,
    fontSize: FontSizes.sm as number,
    textAlign: 'center',
  },
  list: {
    gap: BaseSpace.md,
    flex: 1,
  },
});
